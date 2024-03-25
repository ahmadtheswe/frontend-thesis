import {Component, OnDestroy} from '@angular/core';
import {SecurityService} from "../../../service/security-service/security.service";
import {Login} from "../../../model/dto/entity/Login";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {PaymentService} from "../../../service/payment-service/payment.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  loginRequest: Login = {};
  private subscription = new Subscription();

  constructor(
    private securityService: SecurityService,
    private paymentService: PaymentService,
    private router: Router
  ) {
  }

  onSubmit() {
    this.subscription.add(this.securityService.login(this.loginRequest.username!, this.loginRequest.password!)
      .subscribe({
        next: response => {
          this.securityService.handleResponse(response.data!);
          this.paymentService.checkOnProgressPayment().subscribe(onProgressPayment => {
            if(onProgressPayment !== undefined || true) {
              localStorage.setItem("activeOrderId", onProgressPayment.id);
              console.log(`active order id: ${localStorage.getItem("activeOrderId")}`);
            }
          })
          this.router.navigate(['/dashboard']);
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
