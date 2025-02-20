import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: false,
  
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  constructor(private router:Router){}

  verifyOTP(){
    this.router.navigateByUrl('#');
  }
}
