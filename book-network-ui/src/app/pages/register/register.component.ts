import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email:'',firstname:'',lastname:'',password:''};
  errorMsg: Array<string> = [];
  constructor(
    private router:Router,
    private authService:AuthenticationService
){}


  login(){
    this.router.navigate(['login'])

  }
   register(){

    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
        }
      });

   }
}
