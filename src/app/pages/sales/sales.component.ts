import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

import { ApiRestService } from 'src/app/services/api-rest.service';
import { Product } from 'src/app/interfaces/products';
import { Customer } from 'src/app/interfaces/customers';
import { CartComponent } from '../cart/cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Detail } from 'src/app/interfaces/detail';
import { validation } from 'src/app/utils/validation';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  private modalService = inject(NgbModal);
  private service = inject(ApiRestService);
  private fb = inject(FormBuilder);

  public products: Product[] = [];
  public customers: Customer[] = [];
  public loading: boolean = true;

  public details: Detail[] = [];

  public myForm: FormGroup = this.fb.group({
    clienteid: ['', [Validators.required]],
    serie: [null, [Validators.required]],
    correlativo: [null, [Validators.required]],
    fecha: [null, [Validators.required]],
    subtotal: [0],
    igv: [0],
    total: [0],
    details: [[]],
  });

  ngOnInit(): void {
    forkJoin([
      this.service.get_products(),
      this.service.get_customers(),
    ]).subscribe((results) => {
      this.products = results[0];
      this.customers = results[1];
    });
  }

  openModal() {
    const modalRef = this.modalService.open(CartComponent, {
      centered: true,
    });
    modalRef.componentInstance.modal = modalRef;
    modalRef.componentInstance.products = this.products;
    modalRef.closed.subscribe((res) => {
      this.details = res.details;
      this.myForm.get('subtotal')?.setValue(res.subtotal);
      this.myForm.get('igv')?.setValue(res.igv);
      this.myForm.get('total')?.setValue(res.total);
      this.myForm.get('details')?.setValue(res.details);
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const total = this.myForm.get('total')?.value;
    Swal.fire('OK', 'Venta generada, total: ' + total, 'success');
    console.log(this.myForm.value);
  }

  validators(item: string) {
    const input = this.myForm.controls[item];
    return input.errors && input.touched;
  }

  message(item: string, title: string) {
    return validation(item, title, this.myForm);
  }
}
