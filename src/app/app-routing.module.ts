import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerFormComponent } from './components/seller-form/seller-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { BuyersComponent } from './components/buyers/buyers.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminGuard2 } from './services/auth_guardadmin';
import { BuyerDetailsComponent } from './components/buyer-details/buyer-details.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BuyerActionsComponent } from './components/buyer-actions/buyer-actions.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
// Define your routes
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'seller', component: SellerFormComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'dope', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard2] },
  { path: 'buyer', component: BuyersComponent, canActivate: [AuthGuard] },
  { path: 'buyer-details/:patentId', component: BuyerDetailsComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'buyer-actions', component: BuyerActionsComponent },
  { path: 'contact-us', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Setup RouterModule
  exports: [RouterModule], // Export RouterModule so it can be used in other modules
})
export class AppRoutingModule {}
