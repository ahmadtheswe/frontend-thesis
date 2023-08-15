import { ImagesMenuComponent } from './images-menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ImagesMenuComponent,
    data: {
      title: $localize`Images Menu`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesMenuRoutingModule { }
