import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  _product = new BehaviorSubject<any>('');
  _show = new BehaviorSubject<any>('');
  _productTypes = new BehaviorSubject<any>('');
  _allProducts = new BehaviorSubject<any>('');
  _updateProductResponse = new BehaviorSubject<any>('');
  _showEnquiry = new BehaviorSubject<any>('');

  _productResponseChange: Subject<any> = new Subject<any>();


  setProduct(product: any) {
    this._product.next(product);
  }
  getProduct(): Observable<any> {
    return this._product.asObservable();
  }

  showPopup(show: boolean) {
    this._show.next(show);
  }

  setProductTypes(productTypes: any) {
    this._productTypes.next(productTypes);
  }

  setAllProducts(products: any) {
    this._allProducts.next(products);
  }

  setUpdateProductResponse(response: any) {
    this._productResponseChange.next(response);
  }

  showEnquiryPopup(_showEnquiry: boolean) {
    this._showEnquiry.next(_showEnquiry);
  }

}