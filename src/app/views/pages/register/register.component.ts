import {Component, OnDestroy} from '@angular/core';
import {SecurityService} from "../../../service/security-service/security.service";
import {RegisterRequest} from "../../../service/security-service/security-dto";
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
        password: ['', [Validators.required, this.passwordStrengthValidator]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registerRequest = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        password: this.registerForm.get('password')?.value
      };
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
        ));
    }
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

  passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    const isLengthValid = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isLengthValid;

    // Step 2: Return the result
    return passwordValid ? null : {weakPassword: true};
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;

    // Step 2: Compare the values
    if (password !== repeatPassword) {
      // Step 3: Return the result
      return {passwordMismatch: true};
    }

    return null;
  }

}
