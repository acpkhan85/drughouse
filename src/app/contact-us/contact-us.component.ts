import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  enquiryForm: FormGroup;
  showPopup: boolean;

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private productsvc: ProductsService) { }

  ngOnInit(): void {  
    this.sharedService._showEnquiry.subscribe(data => {
      console.log("in ngoninit : " + data);
      this.showPopup = data;
      if (data) {
        this.sharedService.getProduct().subscribe(pro => {
          console.log("get product :" + pro);
          this.buildForm(pro);
        });
      }
    });
  }

  buildForm(product: any) {
    this.enquiryForm = this.formBuilder.group({
      id: [product.id, Validators.required],
      mobileNo: ['', Validators.required],
      details: ['', Validators.required],
      brands: [product.brands],      
      type: [product.type],       
    })
  }

  onSubmit() {
   
    console.log(this.enquiryForm);   
    this.productsvc.addEnquiry(this.enquiryForm.value).subscribe((data) => {
      console.log(data);      
      this.hidePopup();
    });
  }

  hidePopup() {
    this.showPopup = false;
  }

}
