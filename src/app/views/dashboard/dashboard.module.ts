import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule, BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule, ListGroupModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    ListGroupModule,
    BadgeModule
  ],
  declarations: [DashboardComponent],
  providers: [DatePipe]
})
export class DashboardModule {
}
