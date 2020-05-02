import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  arr: any = [];
  triple: any = [];
  productTypes: Array<string> = [];
  filterProductTypes: Array<string> = [];
  constructor(private productsvc: ProductsService) { }

  ngOnInit(): void {

    this.productsvc.getProductType().subscribe((res) => {
      console.log(res);
      this.productTypes = res;
      console.log(this.productTypes);
    });
    this.populateProduct(null);

  }

  changed(ev, productType) {
    console.log(ev);
    console.log(productType);
    if (ev.target.checked) {
      this.filterProductTypes.push(productType);
    } else {
      this.filterProductTypes = this.filterProductTypes.filter(function (type) {
        return type != productType;
      });
    }
    this.populateProduct(this.filterProductTypes);
  }


  populateProduct(productType: string[]): void {
    this.productsvc.getProduct().subscribe((res) => {
      this.arr = [];
      console.log(res);
      for (let i = 1; i <= res.length; i++) {
        if ((productType && productType.length > 0 && productType.indexOf(res[i - 1].Type)) > -1 || !productType || productType.length == 0) {
          this.triple.push(res[i - 1]);
        }
        if (i % 4 === 0) {
          this.arr.push(this.triple);
          this.triple = [];
        }
      }
      if (this.triple.length > 0) {
        this.arr.push(this.triple);
      }

      console.log(this.arr);
    });

  }

  // filterProducts(productType: string) {
  //   console.log(this.arr);
  //   if (this.arr && this.arr.length > 0) {
  //     this.arr = this.arr.each(function(){
  //       .filter(x => x.Type == productType);
  //     }); 
  //     console.log(this.arr);
  //   }
  // }

}
