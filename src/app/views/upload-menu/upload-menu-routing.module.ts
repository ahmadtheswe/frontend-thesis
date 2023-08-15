import { UploadMenuComponent } from './upload-menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UploadMenuComponent,
    data: {
      title: $localize`Admin Menu`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadMenuRoutingModule { }
