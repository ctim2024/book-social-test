import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { CodeInputModule } from 'angular-code-input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [NgIf, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message = '';
  isOkay = true;
  submitted = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  redirectToLogin() {

    this.router.navigate(['login']);
  }
  onCodeCompleted(token: string) {

    this.confirmAccount(token);

  }

  confirmAccount(token: string) {

    this.authService.confirm(
      { token }).subscribe({
        next: () => { //this.message = 'Your account has been succefully activated.\n Now you can proceed to login' , 
                      this.submitted = true
                      this.isOkay = true
                    },
        error: (err) => { 
          this.message =  'Your token is invalid or has been expired',
          this.submitted = true,
          this.isOkay = false
         }
      }
      )
  }
}
