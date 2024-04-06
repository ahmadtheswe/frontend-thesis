import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../service/security-service/security.service";
import {PaymentService} from "../../service/payment-service/payment.service";
import {PaymentRequest} from "../../service/payment-service/payment-dto";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit, OnDestroy {

  packageLevel: string = "";
  subscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService,
    private paymentService: PaymentService) {
    // debugger
    // this.subscription.add(paymentService.checkOnProgressPayment().subscribe(onProgressPayment => {
    //   debugger
    //   if (onProgressPayment !== null) {
    //     localStorage.setItem("activeOrderId", onProgressPayment.id);
    //     this.router.navigate(['/active-payment']);
    //   } else {
    //     paymentService.checkActivePackage().subscribe(activePackage => {
    //       localStorage.setItem('subscriptionLevel', activePackage.activePackage);
    //       this.activatedRoute.params.subscribe(params => {
    //         this.packageLevel = params['package'];
    //         console.log(this.packageLevel);
    //       });
    //     })
    //   }
    // }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(this.paymentService.checkOnProgressPayment().subscribe({
      next: onProgressPayment => {
        localStorage.setItem("activeOrderId", onProgressPayment.id);
        this.router.navigate(['/active-payment']);
      },
      error: error => {
        this.activatedRoute.params.subscribe({
          next: params => {
            this.packageLevel = params['package'];
            console.log(this.packageLevel);

            this.paymentService.checkActivePackage().subscribe({
              next: activePackage => {
                localStorage.setItem('subscriptionLevel', activePackage.activePackage);
                if (this.securityService.getSubscriptionLevel() === "PREMIUM") {
                  this.router.navigate(['images']);
                } else if (this.securityService.getSubscriptionLevel() === "PRO" && this.packageLevel == "PRO") {
                  this.router.navigate(['images']);
                }
              }
            });
          }
        });
      }
    }));
  }

  upgradePro() {

    const paymentRequest: PaymentRequest = {
      paymentType: "bank_transfer",
      email: localStorage.getItem("email")!,
      packageType: "PRO"
    }

    this.subscription.add(this.paymentService.generateCharge(paymentRequest).subscribe(paymentResponse => {
      console.log(paymentResponse.redirectUrl);
      localStorage.setItem("activeOrderId", paymentResponse.orderId);
      window.open(paymentResponse.redirectUrl, '_blank');

    }));
  }

  upgradePremium() {
    const paymentRequest: PaymentRequest = {
      paymentType: "bank_transfer",
      email: localStorage.getItem("email")!,
      packageType: "PREMIUM"
    }


    this.subscription.add(this.paymentService.generateCharge(paymentRequest).subscribe(paymentResponse => {
      console.log(paymentResponse.redirectUrl);
      localStorage.setItem("activeOrderId", paymentResponse.orderId);
      window.open(paymentResponse.redirectUrl, '_blank');
    }));
  }
}
