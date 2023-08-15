import { WidgetsModule } from './../widgets/widgets.module';
import { ChartjsModule } from '@coreui/angular-chartjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { CardModule, NavModule, TabsModule, GridModule, ProgressModule, ButtonModule, FormModule, ButtonGroupModule, AvatarModule, TableModule } from '@coreui/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadMenuRoutingModule } from './upload-menu-routing.module';
import { UploadMenuComponent } from './upload-menu.component';
import {DocsComponentsModule} from "@docs-components/docs-components.module";


@NgModule({
  declarations: [
    UploadMenuComponent
  ],
  imports: [
    UploadMenuRoutingModule,
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
    DocsComponentsModule,
    FormsModule
  ]
})
export class UploadMenuModule { }
