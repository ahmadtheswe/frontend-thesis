import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentService} from "../../service/payment-service/payment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-payment-callback',
  templateUrl: './payment-callback.component.html',
  styleUrls: ['./payment-callback.component.scss']
})
export class PaymentCallbackComponent implements OnInit, OnDestroy {

  isOrderSuccess: boolean = false;
  subscription: Subscription = new Subscription();
  orderId!: string;

  constructor(private paymentService: PaymentService) {
    debugger
    this.orderId = localStorage.getItem("activeOrderId")!;
  }

  ngOnInit(): void {
    debugger
    this.subscription.add(this.paymentService.checkPaymentStatus(this.orderId).subscribe(paymentStatus => {
      if (paymentStatus.paymentStatus === "PAID") {
        localStorage.setItem("subscriptionLevel", paymentStatus.packageType);
        this.isOrderSuccess = true;
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
