import { Component } from '@angular/core';

import { navItems } from './_nav';
import {ExtendedINavData} from "./ExtendedINavData";
import {SecurityService} from "../../service/security-service/security.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems: ExtendedINavData[] = [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private securityService: SecurityService) {
    if (this.securityService.getRole() !== 'admin') {
      this.navItems = navItems.filter(value => !value.isAdminRequired );
    } else {
      this.navItems = navItems;
    }
  }
}
