import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onRegister(): void {
    this.authService.register({
      username: this.form.name,  // Assuming the backend expects 'username' not 'name'
      email: this.form.email,
      password: this.form.password
    }).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // Optionally, redirect the user or clear the form
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
