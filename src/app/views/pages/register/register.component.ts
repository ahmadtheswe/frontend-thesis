import {Component, OnDestroy} from '@angular/core';
import {SecurityService} from "../../../service/security-service/security.service";
import {RegisterRequest} from "../../../service/security-service/security-dto";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  registerRequest: RegisterRequest = {};
  repeatPassword: string = "";
  private subscription = new Subscription();
  message: string[] | undefined = [];
  isSuccess: boolean = false;
  alreadyRegister: boolean = false;

  registerForm!: FormGroup;

  position = 'top-end';
  visible = true;
  percentage = 0;

  constructor(private securityService: SecurityService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    console.log(this.registerRequest);
    this.subscription.add(
      this.securityService.register(this.registerRequest).subscribe({
          next: value => {
            this.message = value.body?.messages;
            this.isSuccess = true;
            this.toggleToast();
          },
          error: err => {
            this.message = ["Username / email already exists"];
            this.isSuccess = false;
            this.toggleToast();
          }
        }
      ))
  }

  toggleToast() {
    this.alreadyRegister = !this.alreadyRegister;
  }

  onVisibleChange($event: boolean) {
    this.alreadyRegister = $event;
    this.percentage = !this.alreadyRegister ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  backToLogin(): void {
    this.router.navigate(["/login"]);
  }

}
