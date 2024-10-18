import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { NgFor, NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email:'',password:''};
  errorMsg: Array<string> = [];

  constructor(
             private router:Router,
             private authService:AuthenticationService
            ){}

  login() {
  
    this.authService.authenticate({body:this.authRequest}).subscribe({
      next: (res) => {
        //this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  };
  register() {
    this.router.navigate(['register'])
  };
}
