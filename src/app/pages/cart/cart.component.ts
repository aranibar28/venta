import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Detail } from 'src/app/interfaces/detail';
import { Product } from 'src/app/interfaces/products';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  @Input() modal!: NgbActiveModal;
  @Input() products: Product[] = [];

  public details: any = [];
  public product = new FormControl('', Validators.required);
  public total: number = 0;

  ngOnInit(): void {}

  select_product() {
    if (this.product.invalid) {
      return;
    }
    this.build_data(this.product.value as any);
  }

  delete_product(i: number) {
    this.details.splice(i, 1);
    this.calculate_total();
  }

  onSubmit() {
    if (this.details.length === 0) {
      return;
    }

    const payload = {
      details: this.details,
      subtotal: this.total,
      igv: this.total * 0.18,
      total: this.total * 1.18,
    };
    this.modal.close(payload);
  }

  private build_data(item: Product) {
    const product = this.details.find(
      (e: any) => e.productoid === item.productoid
    );
    if (product) {
      product.precio = item.preciosoles;
      product.cantidad += 1;
    } else {
      this.details.push({
        productoid: item.productoid,
        precio: item.preciosoles,
        nombre: item.nombre,
        cantidad: 1,
      });
    }
    this.calculate_total();
  }

  private calculate_total() {
    this.total = this.details.reduce((acc: any, ccr: any) => {
      return acc + ccr.precio * ccr.cantidad;
    }, 0);
  }
}
