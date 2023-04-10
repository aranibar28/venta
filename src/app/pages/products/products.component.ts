import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Product } from 'src/app/interfaces/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private service = inject(ApiRestService);

  public products: Product[] = [];
  public loading: boolean = true;

  ngOnInit(): void {
    this.service.get_products().subscribe((res) => {
      this.products = res;
      this.loading = false;
    });
  }
}
