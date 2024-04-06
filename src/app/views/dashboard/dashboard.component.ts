import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentService} from "../../service/payment-service/payment.service";
import {SecurityService} from "../../service/security-service/security.service";
import {Subscription} from "rxjs";
import {DatePipe} from "@angular/common";
import {PackageCountResponse} from "../../service/payment-service/payment-dto";

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isAdmin: boolean = false;

  activeSubscription: string = "";
  subscriptionValidUntil: string | null = "";
  username: string | null = "";
  activeUsersCount: number | undefined = 0;
  packageCount: PackageCountResponse[] = [];

  subscription: Subscription = new Subscription();

  constructor(
    private paymentService: PaymentService,
    private securityService: SecurityService,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.isAdmin = this.securityService.getRole() == 'admin';

    this.username = this.securityService.getUsername();

    if (!this.isAdmin) {
      this.subscription.add(this.paymentService.checkActivePackage().subscribe({
        next: data => {
          this.activeSubscription = data.activePackage;
          const parsedDate = new Date(data.activeUntil);
          this.subscriptionValidUntil = this.datePipe.transform(parsedDate, 'MMMM d, yyyy HH:mm');
        }
      }))
    } else {
      this.subscription.add(this.securityService.getActiveUsersCount().subscribe({
        next: data => {
          this.activeUsersCount = data.data?.activeUsers
        }
      }))

      this.subscription.add(this.paymentService.getActivePaidSubscriptionCount().subscribe({
        next: data => {
          this.packageCount = data;
        }
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
