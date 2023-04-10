import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Customer } from 'src/app/interfaces/customers';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
})
export class CustomersComponent {
  private service = inject(ApiRestService);

  public customers: Customer[] = [];
  public loading: boolean = true;

  ngOnInit(): void {
    this.service.get_customers().subscribe((res) => {
      this.customers = res;
      this.loading = false;
    });
  }
}
