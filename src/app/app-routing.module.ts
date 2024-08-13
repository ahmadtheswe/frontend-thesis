import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import {AuthGuard} from "./service/security-service/auth.guard";
import {UploadMenuComponent} from "./views/upload-menu/upload-menu.component";
import {ImagesMenuComponent} from "./views/images-menu/images-menu.component";
import {MapExampleComponent} from "./views/map-example/map-example.component";
import {ImageDetailComponent} from "./views/images-menu/image-detail/image-detail.component";
import {UpgradeComponent} from "./views/upgrade/upgrade.component";
import {ActivePaymentComponent} from "./views/active-payment/active-payment.component";
import {PaymentCallbackComponent} from "./views/payment-callback/payment-callback.component";
import {YourOrderComponent} from "./views/your-order/your-order.component";
import {CreateOrderComponent} from "./views/create-order/create-order.component";
import {YourOrderDetailComponent} from "./views/your-order-detail/your-order-detail.component";
import {AdminPriceComponent} from "./views/admin-price/admin-price.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'images',
        component: ImagesMenuComponent,
        data: {
          title: $localize`Images Menu`
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'images/detail',
        component: ImageDetailComponent,
        data: {
          title: $localize`Images Detail`
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'upload',
        component: UploadMenuComponent,
        data: {
          title: $localize`Admin Menu`
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'upgrade/:package',
        component: UpgradeComponent,
        data: {
          title: $localize`Upgrade Subscription`
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'active-payment',
        component: ActivePaymentComponent,
        data: {
          title: `Continue your payment`
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'payment-callback',
        component: PaymentCallbackComponent,
        data: {
          title: `Your transaction`
        },
        // canActivate: [AuthGuard]
      },
      {
        path: 'map-example',
        component: MapExampleComponent,
        data: {
          title: $localize`Map Example`
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'your-orders',
        component: YourOrderComponent,
        data: {
          title: $localize`Your Orders`
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'your-orders/:id',
        component: YourOrderDetailComponent,
        data: {
          title: $localize`Your Orders`
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'create-order',
        component: CreateOrderComponent,
        data: {
          title: $localize`Create Order`
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'price-setup',
        component: AdminPriceComponent,
        data: {
          title: $localize`Setup Price`
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
