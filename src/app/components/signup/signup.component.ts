import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf/ngFor
import { FormsModule } from '@angular/forms';    // Import FormsModule to use ngModel

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Import FormsModule here
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formData = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: ''
  };

  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.signUp(this.formData).subscribe(
      response => {
        this.message = 'Sign-up successful!';
      },
      error => {
        this.message = 'Error during sign-up. Please try again.';
        console.error(error);
      }
    );
  }
}
