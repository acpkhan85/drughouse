import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getProduct(): any {
    return this.http.get<any>("https://localhost:44317/api/Products");
  }

  getProductType(): any {
    return this.http.get<any>("https://localhost:44317/productType");
  }

  updateProduct(productDetail: any): Observable<any> {
    return this.http.post('https://localhost:44317/api/products/updateProduct', productDetail, httpOptions);
  }

  addEnquiry(enquiryDetail: any): Observable<any> {
    return this.http.post('https://localhost:44317/api/Products/addEnquiry', enquiryDetail, httpOptions);
  }

  getTopProduct(): any {
    return this.http.get<any>("https://localhost:44317/api/Products/getTopProducts");
  }

}
