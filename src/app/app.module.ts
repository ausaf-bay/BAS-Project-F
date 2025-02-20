import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SellerFormComponent } from './components/seller-form/seller-form.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { BuyersComponent } from './components/buyers/buyers.component';
import { AdminGuard2 } from './services/auth_guardadmin';
import { BuyerDetailsComponent } from './components/buyer-details/buyer-details.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BuyerActionsComponent } from './components/buyer-actions/buyer-actions.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpComponent } from './components/otp/otp.component';
// Define routes
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'forgot',component:ForgotPasswordComponent}, 
  {path:'otp',component:OtpComponent},
  { path: 'logout', component: LogoutComponent },
  {path:'seller',component:SellerFormComponent},
  {path:'admin',component:AdminPanelComponent,canActivate:[AdminGuard2]},
  {path:'buyer',component:BuyersComponent,canActivate:[AuthGuard]},
  { path: '', component:HomeComponent },
  {path: 'buyer-details/:patentId', component: BuyerDetailsComponent },
  {path:'about-us',component:AboutComponent},
  {path:'buyer-actions',component:BuyerActionsComponent},
  {path:'contact-us',component:ContactUsComponent}// Default route
];
library.add(faTwitter, faFacebook, faInstagram, faLinkedin);

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, ForgotPasswordComponent],
  imports: [
    FontAwesomeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // Setup RouterModule
    SellerFormComponent
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
