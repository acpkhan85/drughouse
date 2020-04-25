import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProduct():any
  {
  
  return this.http.get<any>(`http://localhost:3000/drugdata`);
  }

  getProductType():any{
    return this.http.get<any>("http://localhost:3000/productType");
  }
}
