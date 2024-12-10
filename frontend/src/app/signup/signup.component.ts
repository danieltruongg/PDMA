import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  usernameInput: string = '';
  passwordInput: string = '';
  confPasswordInput: string = '';

  constructor(private userService: UserService, private router: Router) {}

  signUp() {
    let details = {
      username: this.usernameInput,
      password: this.passwordInput,
      confirm_password: this.confPasswordInput
    }

    this.userService.signUp(details).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['login']);
      }, 

      error: error => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
