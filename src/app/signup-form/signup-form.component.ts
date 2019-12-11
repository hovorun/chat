import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  email: string;
  password: string;
  displayName: string;

  constructor(private router: Router) {
  }

  public signUpAction() {
    this.signUp()
      .then(response => {
        console.log(`response is: ${response}`);
        if(response == "success" ) {
          this.router.navigateByUrl('/chat');
        } else {
          console.log(`did not sign-up!`);
        }
      }).catch(e => {
      console.log(e);
    });
  }
  public async signUp() {
    const signUpData = {
      email: this.email,
      password: this.password,
      displayName: this.displayName,
    };
    try {
      const request = await fetch(`http://localhost:8080/register`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(signUpData),
      });
      return await request.text();
    } catch (e) {
      console.log(e);
    }
  }


}
