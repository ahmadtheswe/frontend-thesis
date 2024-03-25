import {Component, OnDestroy} from '@angular/core';
import {PaymentService} from "../../service/payment-service/payment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-active-payment',
  templateUrl: './active-payment.component.html',
  styleUrls: ['./active-payment.component.scss']
})
export class ActivePaymentComponent implements OnDestroy {
  redirectUrl: string = "";
  packageId: string = "";
  subscription: Subscription = new Subscription();

  constructor(private paymentService: PaymentService) {
    this.subscription.add(paymentService.checkOnProgressPayment().subscribe(onProgressPayment => {
      if (onProgressPayment !== null || true) {
        this.packageId = onProgressPayment.packageId;
        this.redirectUrl = onProgressPayment.redirectUrl;
        console.log(`Redirecting to ${this.redirectUrl}`);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
