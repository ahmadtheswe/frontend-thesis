import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import {AppRoutingModule} from './app-routing.module';

// Import app component
import {AppComponent} from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule, CollapseModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule, ModalModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule, TableModule,
  TabsModule, ToastModule,
  UtilitiesModule,
} from '@coreui/angular';

import {IconModule, IconSetService} from '@coreui/icons-angular';
import {ImagesMenuComponent} from './views/images-menu/images-menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {ImagePipe} from './service/image-service/image.pipe';
import {UploadMenuComponent} from "./views/upload-menu/upload-menu.component";
import {MapExampleComponent} from './views/map-example/map-example.component';
import { ImageDetailComponent } from './views/images-menu/image-detail/image-detail.component';
import { UpgradeComponent } from './views/upgrade/upgrade.component';
import { ActivePaymentComponent } from './views/active-payment/active-payment.component';
import { PaymentCallbackComponent } from './views/payment-callback/payment-callback.component';
import { YourOrderComponent } from './views/your-order/your-order.component';
import { CreateOrderComponent } from './views/create-order/create-order.component';
import { ImagePreorderPipe } from './service/image-service/image-preorder.pipe';
import { YourOrderDetailComponent } from './views/your-order-detail/your-order-detail.component';
import { AdminPriceComponent } from './views/admin-price/admin-price.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ImagesMenuComponent,
    UploadMenuComponent,
    ImagePipe,
    MapExampleComponent,
    ImageDetailComponent,
    UpgradeComponent,
    ActivePaymentComponent,
    PaymentCallbackComponent,
    YourOrderComponent,
    CreateOrderComponent,
    ImagePreorderPipe,
    YourOrderDetailComponent,
    AdminPriceComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    CollapseModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    FormsModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    ModalModule,
    TableModule,
    ToastModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
