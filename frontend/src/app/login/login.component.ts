import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usernameInput: string = '';
  passwordInput: string = '';

  constructor(private userService: UserService, private router: Router) {}

  logIn() {
    let details = {
      username: this.usernameInput,
      password: this.passwordInput
    }

    this.userService.logIn(details).subscribe({
      next: data => {
        console.log(data);
        this.userService.flipAuthentication();
        this.router.navigate(['']);
      }, 

      error: error => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
