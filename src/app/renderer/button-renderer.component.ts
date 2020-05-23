// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'button-renderer',
  templateUrl: './button-renderer.component.html',
})

export class ButtonRendererComponent implements ICellRendererAngularComp {
  constructor(private sharedService: SharedService) {

  }
  params;
  label: string;
  id: string;

  agInit(params): void {
    console.log("in agInit");
    console.log(params.data);
    this.id = params.data._id.timestamp;
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
  showPopup() {
    console.log("in showPopup");
    this.sharedService.setProduct(this.params.data);
    this.sharedService.showPopup(true);
  }
}