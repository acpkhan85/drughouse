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
  productTypes : Array<string>=[];

  constructor(private productsvc: ProductsService) { }

  ngOnInit(): void {
    this.productsvc.getProduct().subscribe((res) => {
      console.log(res);

      for (let i = 1; i <= res.length; i++) {
        this.triple.push(res[i - 1]);
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

    this.productsvc.getProductType().subscribe((res) => {
      console.log(res);   
      this.productTypes=res;  
      console.log(this.productTypes);
    });
  }

}
