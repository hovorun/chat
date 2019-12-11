import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  email: string;
  password: string;

  constructor(private router: Router) {
  }

  public loginAction() {
    this.myLogin()
      .then(response => {
        console.log(`response is: ${response}`);
        if(response == "true") {
            this.router.navigateByUrl('/chat');
        } else {
          console.log(`not logged!`);
        }
    }).catch(e => {
      console.log(e);
    });
  }
  public async myLogin() {
    const loginData = {
      email: this.email,
      password: this.password,
    };
    try {
      const request = await fetch(`http://localhost:8080/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(loginData),
      });
      return await request.text();
    } catch (e) {
      console.log(e);
    }
  }
}

