import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  productDetails: any;
  constructor(public activatedRoute: ActivatedRoute, private sharedService: SharedService) {
    console.log("in detail view");
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      // tslint:disable-next-line: no-string-literal  
      console.log("in product detail");
      console.log(param['id']);
      this.sharedService._allProducts.subscribe(products => {
        if (products) {
          this.productDetails = products.filter(x => x.id == param['id'])[0];
          console.log(this.productDetails);
        }
      });
    });
  }

  showEnquiryPopup() {
    this.sharedService.showEnquiryPopup(true);
    this.sharedService.setProduct(this.productDetails);
  }

}
