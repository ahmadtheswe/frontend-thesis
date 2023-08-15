import { Component } from '@angular/core';

@Component({
  selector: 'app-images-menu',
  templateUrl: './images-menu.component.html',
  styleUrls: ['./images-menu.component.scss']
})
export class ImagesMenuComponent {
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
}
