import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductAdminViewComponent } from './product-admin-view/product-admin-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-list', component: ProductAdminViewComponent },
  { path: 'product-detail/:id', component: DetailViewComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
