import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.css']
})
export class TopProductsComponent implements OnInit {

  products: any;
  constructor(private productsvc: ProductsService, ) { }

  ngOnInit(): void {
    this.productsvc.getTopProduct().subscribe((products) => {
      this.products = products;
    });
  }

}
