import {Component, Input, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {ClassToggleService, HeaderComponent} from '@coreui/angular';
import {Subscription} from "rxjs";
import {SecurityService} from "../../../service/security-service/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnDestroy {

  @Input() sidebarId: string = "sidebar";
  private subscription: Subscription = new Subscription();

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private securityService: SecurityService,
    private router: Router) {
    super();
  }

  onLogoutClick(): void {
    this.subscription = this.securityService.logout().subscribe(value => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
