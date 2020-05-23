import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { SharedService } from '../shared/shared.service';

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
  allProducts: Array<any> = [];
  showLoader:boolean=true;
  constructor(private productsvc: ProductsService, private sharedService: SharedService) { }

  ngOnInit(): void {

    // this.productsvc.getProductType().subscribe((res) => {
    //   console.log(res);
    //   this.productTypes = res;
    //   console.log(this.productTypes);
    // });
    this.populateProduct(null);
    //this.getProductTypes();

  }

  getProductTypes() {
    this.productTypes = [...new Set(this.allProducts.map(item => item.type))];
    console.log(this.productTypes);
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
    this.sharedService._allProducts.subscribe((products) => {
      if (products) {
        this.allProducts = products;
        this.populatedProducts(productType);
        this.showLoader=false;
      }
      else{
        this.productsvc.getProduct().subscribe((res) => {
          this.allProducts = res;
          this.sharedService.setAllProducts(this.allProducts);
          this.populatedProducts(productType);
          this.showLoader=false;
        });
      }
    });
    // this.productsvc.getProduct().subscribe((res) => {
    //   this.allProducts = res;
    //   this.sharedService.setAllProducts(this.allProducts);
      
    // });

  }

  populatedProducts(productType: string[])
  {
    if (!productType) {
      this.getProductTypes();
    }
    this.arr = [];
    let productFound=0;
    //console.log(this.allProducts);
    for (let i = 1; i <= this.allProducts.length; i++) {      
      if ((productType && productType.length > 0 && productType.indexOf(this.allProducts[i - 1].type)) > -1 || !productType || productType.length == 0) {
        console.log("triple push");
        productFound++;
        this.triple.push(this.allProducts[i - 1]);
      }
      if (productFound % 4 === 0) {
        console.log("in if :" + productFound)
        if (this.triple.length > 0) {
          this.arr.push(this.triple);
          this.triple = [];
        }        
      }
    }
    if (this.triple.length > 0) {
      this.arr.push(this.triple);
    }
    console.log("array:")
    console.log(this.arr);
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
