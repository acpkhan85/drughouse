import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { requiredFileType, toFormData } from '../fileupload/customvalidator';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SharedService } from '../shared/shared.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  showPopup: boolean;
  productTypes: Array<string>;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: 'Times New Roman',
    defaultFontSize: '11px',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['strikeThrough', 'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent'],
      ['customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode']
    ]
  };
  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private productsvc: ProductsService) { }

  ngOnInit(): void {
    this.sharedService._productTypes.subscribe(types => {
      this.productTypes = types;
    });
    this.sharedService._show.subscribe(data => {
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
    this.productForm = this.formBuilder.group({
      id: [product.id, Validators.required],
      name: [product.brands, Validators.required],
      detail: [product.detail, Validators.required],
      type: [product.type, Validators.required],
      productImg: new FormControl(null, [Validators.required, requiredFileType('png|jpeg')]),
      showPrice: [product.showPrice ? product.showPrice : false, Validators.required],
      showEnquiry: [product.showEnquiry ? product.showEnquiry : false, Validators.required],
      price: [product.price, Validators.required],
      content: [product.content],
      strength: [product.strength],
      pack: [product.pack],
      brands: [product.brands],
    })
  }

  onSubmit() {

    // if (this.productForm.invalid) {
    //   console.log('invalid form');
    //   return;
    // }    
    console.log(this.productForm);
    // console.log(toFormData(this.productForm.value));    
    this.productsvc.updateProduct(this.productForm.value).subscribe((data) => {
      console.log(data);
      this.sharedService.setUpdateProductResponse(data);
      this.hidePopup();
    });
  }

  hidePopup() {
    this.showPopup = false;
  }
}
