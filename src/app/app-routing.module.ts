import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductAdminViewComponent } from './product-admin-view/product-admin-view.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'product-list', component: ProductAdminViewComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
