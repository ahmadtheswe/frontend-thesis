import {Component, OnDestroy} from '@angular/core';
import {SecurityService} from "../../../service/security-service/security.service";
import {Login} from "../../../model/dto/entity/Login";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

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
    private router: Router
  ) {
  }

  onSubmit() {
    this.subscription = this.securityService.login(this.loginRequest.username!, this.loginRequest.password!)
      .subscribe({
        next: response => {
          this.securityService.handleResponse(response.data!);
          this.router.navigate(['/dashboard']);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
