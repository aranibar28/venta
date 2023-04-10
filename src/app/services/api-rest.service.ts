import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/products';
import { Customer } from '../interfaces/customers';

const base_url = 'http://srv2.marketsol.pe:8088/api';
@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { Authorization: `Bearer ${this.token}` } };
  }
  get_token(): Observable<any> {
    const url = `${base_url}/Seguridad`;
    return this.http.get(url, this.headers);
  }

  get_products(): Observable<Product[]> {
    const url = `${base_url}/Venta/ObtenerProductos`;
    return this.http.get<Product[]>(url, this.headers);
  }

  get_customers(): Observable<Customer[]> {
    const url = `${base_url}/Venta/ObtenerClientes`;
    return this.http.get<Customer[]>(url, this.headers);
  }

  post_venta(data: any): Observable<any> {
    const url = `${base_url}/Venta/InsertarVenta`;
    return this.http.post<any>(url, data, this.headers);
  }
}
