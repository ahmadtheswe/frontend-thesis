import {Component, OnDestroy} from '@angular/core';
import {SecurityService} from "../../../service/security-service/security.service";
import {Login} from "../../../model/dto/entity/Login";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{

  loginRequest: Login = {};
  private subscription = new Subscription();
  constructor(
    private securityService: SecurityService
  ) { }

  onSubmit() {
    this.subscription = this.securityService.login(this.loginRequest.username!, this.loginRequest.password!)
      .subscribe(response => {
        console.log(response);
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
