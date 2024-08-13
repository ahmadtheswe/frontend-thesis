import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {ClassToggleService, HeaderComponent} from '@coreui/angular';
import {Subscription} from "rxjs";
import {SecurityService} from "../../../service/security-service/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent implements OnDestroy, OnInit {

  @Input() sidebarId: string = "sidebar";
  private subscription: Subscription = new Subscription();

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  username: string | null = "";

  constructor(
    private classToggler: ClassToggleService,
    private securityService: SecurityService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.username = this.securityService.getUsername();
  }

  onLogoutClick(): void {
    if (!this.securityService.isTokenExpired) {
      this.securityService.cleanLocalStorage();
      this.router.navigate(['/login']);
    } else {
      this.subscription.add(this.securityService.logout().subscribe({
        next: value => {
          this.securityService.cleanLocalStorage();
          this.router.navigate(['/login']);
        }
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
