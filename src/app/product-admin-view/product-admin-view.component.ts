import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ButtonRendererComponent } from '../renderer/button-renderer.component';
import { ProductsService } from '../products/products.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-product-admin-view',
  templateUrl: './product-admin-view.component.html',
  styleUrls: ['./product-admin-view.component.css']
})
export class ProductAdminViewComponent implements OnInit {
  frameworkComponents: any;

  products: any;
  productTypes: Array<string> = [];
  alertClass = "";
  alertMsg: string;
  showAlert: boolean = false;
  private gridApi;
  columnDefs = [
    { headerName: 'Type', field: 'type', sortable: true, filter: true },
    { headerName: 'Content', field: 'content', sortable: true, filter: true },
    { headerName: 'Strength', field: 'strength', sortable: true, filter: true },
    { headerName: 'Pack', field: 'pack', sortable: true, filter: true },
    { headerName: 'Brands', field: 'brands', sortable: true, filter: true },
    {
      headerName: 'Edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onEditClick.bind(this),
        label: 'Edit'
      }
    },
  ];

  rowData: any;
  // = [
  //   { make: 'Toyota', model: 'Celica', price: 35000, make1: "Toyota" },
  //   { make: 'Ford', model: 'Mondeo', price: 32000, make1: "Toyota" },
  //   { make: 'Porsche', model: 'Boxter', price: 72000, make1: "Toyota" }
  // ];
  constructor(private productsvc: ProductsService, private sharedService: SharedService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit(): void {
    this.productsvc.getProduct().subscribe((res) => {
      this.rowData = res;
      res.forEach(element => {
        if (this.productTypes.indexOf(element.type) == -1) {
          this.productTypes.push(element.type);
        }
      });
      this.sharedService.setProductTypes(this.productTypes);
    });
    this.sharedService._productResponseChange.subscribe((data) => {
      if (data && data.messages[0].code == "0000") {
        this.alertClass = "success";
        const index = this.rowData.findIndex((e) => e.id === data.product.id);
        if (index === -1) {
          this.rowData.push(data.product);
        } else {
          this.rowData[index] = data.product;
        }
        this.gridApi.setRowData(this.rowData); // Refresh grid     
      }
      else {
        this.alertClass = "error";
      }
      this.alertMsg = data.messages[0].detail;
      if (this.alertMsg) {
        this.showAlert = true;
      }
    });
  }


  onEditClick(e) {
    console.log("Edit button clicked");
  }
  onDeleteClick(e) {
    console.log("Delete button clicked");
  }


  onGridReady(params) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  showPopup() {
    console.log("in showPopup");
    this.sharedService.setProduct(new Object());
    this.sharedService.showPopup(true);
  }
}
