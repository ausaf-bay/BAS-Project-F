import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/accounts'; // Adjust based on your backend URL
  private token: string = "";
  private isAdmin: boolean = false;
  router: any;
  constructor(private http: HttpClient) { }

  // Function to get the CSRF token from the browser cookies (if it's set)
  private getCsrfToken(): string {
    const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
    return csrfToken ? csrfToken.split('=')[1] : '';
  }

  signUp(data: any): Observable<any> {
    const csrfToken = this.getCsrfToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken
    });
    return this.http.post(`${this.baseUrl}/signup/`, data, { headers });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, data);
  }

  

  logout(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');  // Get the access token
    const refreshToken = localStorage.getItem('refresh_token');  // Get the refresh token
  
    // Prepare headers with Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
    });
  
    // Prepare the request body with the refresh token
    const body = {
      refresh_token: refreshToken
    };
  
    // Send the logout request to the backend
    return this.http.post(`${this.baseUrl}/logout/`, body, { headers });
  }
  
  clearSession(): void {
    localStorage.removeItem('access_token');
     // Remove the token from local storage
    
 
  }
  isAdminUser() {
    return localStorage.getItem('is_admin') === 'true';
  }
  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  }
  // Inside your AuthService
loginUser(credentials: any) {
  // Make an API call to authenticate the user
  this.http.post('your-login-endpoint', credentials).subscribe((response: any) => {
    localStorage.setItem('token', response.access_token);
    const expiryDate = new Date(new Date().getTime() + response.expires_in * 1000); // Assuming expires_in is in seconds
    localStorage.setItem('token_expiry', expiryDate.toString());
  });
}

  
}
