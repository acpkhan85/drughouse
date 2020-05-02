import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ButtonRendererComponent } from '../renderer/button-renderer.component';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { requiredFileType, toFormData } from '../fileupload/customvalidator';

@Component({
  selector: 'app-product-admin-view',
  templateUrl: './product-admin-view.component.html',
  styleUrls: ['./product-admin-view.component.css']
})
export class ProductAdminViewComponent implements OnInit {
  frameworkComponents: any;
  productForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      detail: ['', Validators.required],
      type: ['', Validators.required],
      productImg: new FormControl(null, [Validators.required, requiredFileType('png|jpeg')]),
      showPrice: ['', Validators.required],
      showEnquiry: ['', Validators.required],
      price: ['', Validators.required]
    })
  }
  columnDefs = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true },
    { headerName: 'Make1', field: 'make1', sortable: true, filter: true },
    {
      headerName: 'Edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onEditClick.bind(this),
        label: 'Edit'
      }
    },
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000, make1: "Toyota" },
    { make: 'Ford', model: 'Mondeo', price: 32000, make1: "Toyota" },
    { make: 'Porsche', model: 'Boxter', price: 72000, make1: "Toyota" }
  ];

  onEditClick(e) {
    console.log("Edit button clicked");
  }
  onDeleteClick(e) {
    console.log("Delete button clicked");
  }


  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

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

  onSubmit() {

    if (this.productForm.invalid) {
      return;
    }
    console.log(toFormData(this.productForm.value));
  }


}
