import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router :Router){

  }
  naviagateToBuy(){
    this.router.navigateByUrl('buyer');
  }
  naviagateToShell(){
    this.router.navigateByUrl('seller');
  }

}
