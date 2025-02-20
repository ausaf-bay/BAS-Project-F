import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Import necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  message: string = '';
  userData: any = null; // To store user data from backend

  constructor(private authService: AuthService,private router: Router) {}

  goToSignUp(){
    this.router.navigateByUrl('signup')
  }
  goForgot(){
    this.router.navigateByUrl('forgot');
  }

  onSubmit() {
    this.authService.login(this.formData).subscribe(
      response => {
        // Handle the successful response
        this.message = 'Login successful!';
        localStorage.setItem('access_token', response.access_token); // Save access token
        localStorage.setItem('refresh_token', response.refresh_token); // Save refresh token
        localStorage.setItem('is_admin', response.is_admin);
        // Store user data for display
        this.userData = {
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email
        };

        console.log('User Data:', this.userData); // Log user data to the console
      },
      error => {
        // Handle errors
        this.message = 'Invalid email or password.';
        console.error('Login Error:', error); // Log error details
      }
    );
  }
}
