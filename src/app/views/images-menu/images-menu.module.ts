import { WidgetsModule } from './../widgets/widgets.module';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { CardModule, NavModule, TabsModule, GridModule, ProgressModule, ButtonModule, FormModule, ButtonGroupModule, AvatarModule, TableModule } from '@coreui/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesMenuRoutingModule } from './images-menu-routing.module';
import {NgbDatepicker} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [],
  imports: [
    ImagesMenuRoutingModule,
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
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    NgbDatepicker,
  ]
})
export class ImagesMenuModule { }
