import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { HeaderComponent } from './header/header.component';
import { BoxesComponent } from './boxes/boxes.component';
import { IntroComponent } from './intro/intro.component';
import { ActionComponent } from './action/action.component';
import { ServiceComponent } from './service/service.component';
import { FacilityComponent } from './facility/facility.component';
import { FooterComponent } from './footer/footer.component';
import { PricingComponent } from './pricing/pricing.component';
import { PartnerComponent } from './partner/partner.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

const appRoutes: Routes = [
  { path: 'product-detail', component: DetailViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DetailViewComponent,
    ProductsComponent,
    HomeComponent,
    BannerComponent,
    HeaderComponent,
    BoxesComponent,
    IntroComponent,
    ActionComponent,
    ServiceComponent,
    FacilityComponent,
    FooterComponent,
    PricingComponent,
    PartnerComponent,
    TestimonialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes     
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
