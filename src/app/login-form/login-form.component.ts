import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password)
      .catch(error => this.errorMsg = error.message);
  }
}
