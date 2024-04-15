import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

interface LoginModel {
  email: string;
  password: string;
}

interface SignUpModel {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSignUpVisible: boolean = false;
  signUpObj: SignUpModel = { name: '', email: '', password: '' };
  loginObj: LoginModel = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/profile']);
    }
  }

  onLogin(): void {
    this.authService.login({
      username: this.loginObj.email,  // Assuming username is used as email
      password: this.loginObj.password
    }).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.router.navigate(['/profile']);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  onRegister(): void {
    this.authService.register({
      username: this.signUpObj.name,
      email: this.signUpObj.email,
      password: this.signUpObj.password
    }).subscribe(
      data => {
        console.log('Registration successful', data);
        this.isSignUpVisible = false;  // Switch to login view after successful registration
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
