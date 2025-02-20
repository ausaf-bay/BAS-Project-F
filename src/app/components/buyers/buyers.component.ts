/* 
  import { Component, OnInit } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  
  @Component({
    selector: 'app-buyers',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './buyers.component.html',
    styleUrls: ['./buyers.component.css']
  })
  export class BuyersComponent implements OnInit {
    buyerData: any[] = [];
    selectedActions: Map<number, string> = new Map(); // Tracks selected actions
    submissionStatus: Map<number, boolean> = new Map(); // Tracks submission status
  
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.fetchBuyerData();
    }
  
    fetchBuyerData() {
      this.http.get('http://localhost:8000/api/accounts/buyer-data/').subscribe(
        (response: any) => {
          this.buyerData = response;
        },
        (error) => {
          console.error('Error fetching buyer data:', error);
        }
      );
    }
  
    selectAction(patentId: number, action: string) {
      this.selectedActions.set(patentId, action); // Save the selected action for the specific entry
      console.log(`Selected action for patent ${patentId}: ${action}`);
    }
  
    confirmSubmit(patentId: number) {
      const action = this.selectedActions.get(patentId);
      if (!action) {
        alert('Please select an action before submitting.');
        return;
      }
      if (confirm(`Are you sure you want to submit "${action}" for patent ID ${patentId}?`)) {
        this.submitAction(patentId, action);
      }
    }
  
    submitAction(patentId: number, action: string) {
      const token = localStorage.getItem('access_token'); // Retrieve token from storage
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}` // Use Bearer for JWT
      });
  
      const payload = { id: patentId, action: action };
  
      this.http.post('http://localhost:8000/api/accounts/buyerChoice/', payload, { headers }).subscribe(
        (response) => {
          console.log(`Action "${action}" for patent ID ${patentId} submitted successfully:`, response);
          this.submissionStatus.set(patentId, true); // Mark this entry as submitted
        },
        (error) => {
          console.error(`Error submitting action "${action}" for patent ID ${patentId}:`, error);
        }
      );
    }
  
    enableResubmit(patentId: number) {
      this.submissionStatus.set(patentId, false); // Allow resubmission for the specific patent
      this.selectedActions.delete(patentId); // Clear the previously selected action
    }
  }

 */
  import { Component, OnInit } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { Router } from '@angular/router';
  @Component({
    selector: 'app-buyers',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './buyers.component.html',
    styleUrls: ['./buyers.component.css']
  })
  export class BuyersComponent implements OnInit {
    buyerData: any[] = []; // All buyer data
    filteredData: any[] = []; // Data to display after filtering
    filters: any = {
      primary_technology: '',
      important: '',
      entity_status: '',
      acquisition_status: '',
      bay_rating: '',
      enforceability: '',
      keywords: '',
      patent_number:'',
      company_name: '',
      target:'',
      expiry:'',
    }; // Filter criteria
    expiryYears: number = 1;
    selectedActions: Map<number, string> = new Map(); // Tracks selected actions
    submissionStatus: Map<number, boolean> = new Map(); // Tracks submission status
    
  
    constructor(private http: HttpClient,private router: Router) {}
  
    ngOnInit() {
      this.fetchBuyerData();
    }
  
    // Fetch all buyer data
    fetchBuyerData() {
      const token = localStorage.getItem('access_token'); // Retrieve token from local storage

    let headers = new HttpHeaders();
    if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
    }
      this.http.get(`http://localhost:8000/api/accounts/buyer-data/`,{headers}).subscribe(
        (response: any) => {
          this.buyerData = response;
          this.filteredData = response; // Initialize filteredData with all data
        },
        (error) => {
          console.error('Error fetching buyer data:', error);
        }
      );
    }
  
    // Apply filters to buyer data
    applyFilters() {
      this.filteredData = this.buyerData.filter((buyer) => {
        return Object.keys(this.filters).every((key) => {
          const filterValue = this.filters[key];
          if (!filterValue) return true; // Skip empty filters
          return (
            String(buyer[key])
              .toLowerCase()
              .includes(String(filterValue).toLowerCase())
          );
        });
      });
    }
    applyFilters2() {
      const currentDate = new Date();
      const maxExpiryDate = new Date();
      maxExpiryDate.setFullYear(currentDate.getFullYear() + this.expiryYears); // Calculate expiry date limit
  
      this.filteredData = this.buyerData.filter((buyer) => {
        return Object.keys(this.filters).every((key) => {
          const filterValue = this.filters[key];
          if (!filterValue) return true; // Skip empty filters
  
          return (
            String(buyer[key])
              .toLowerCase()
              .includes(String(filterValue).toLowerCase())
          );
        }) &&
          (!buyer.expiry || new Date(buyer.expiry) <= maxExpiryDate); // Apply expiry filter
      });
    }
    // Clear all filters
    clearFilters() {
      this.filters = {
        
        primary_technology: '',
        important: '',
        entity_status: '',
        acquisition_status: '',
        bay_rating: '',
        enforceability: '',
        keywords: '',
        patent_number:'',
        company_name: '',
        target:'',
      };
      this.expiryYears = 1; // Reset expiry filter to default
       this.applyFilters2();

      
    }
  
    selectAction(patentId: number, action: string) {
      this.selectedActions.set(patentId, action); // Save the selected action for the specific entry
      console.log(`Selected action for patent ${patentId}: ${action}`);
    }
  
    confirmSubmit(patentId: number) {
      const action = this.selectedActions.get(patentId);
      if (!action) {
        alert('Please select an action before submitting.');
        return;
      }
      if (confirm(`Are you sure you want to submit "${action}" for patent ID ${patentId}?`)) {
        this.submitAction(patentId, action);
      }
    }
  
    submitAction(patentId: number, action: string) {
      const token = localStorage.getItem('access_token'); // Retrieve token from storage
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}` // Use Bearer for JWT
      });
  
      const payload = { id: patentId, action: action };
      
      this.http.post('http://localhost:8000/api/accounts/buyerChoice/', payload, { headers }).subscribe(
        (response) => {
          console.log(`Action "${action}" for patent ID ${patentId} submitted successfully:`, response);
          this.submissionStatus.set(patentId, true); // Mark this entry as submitted
        },
        (error) => {
          console.error(`Error submitting action "${action}" for patent ID ${patentId}:`, error);
        }
      );
    }
    adjustExpiryYears(value: number) {
      this.expiryYears += value;
      if (this.expiryYears < 1) {
        this.expiryYears = 1; // Ensure expiry filter doesn't go below 1 year
      }
      this.applyFilters2();
    }
    enableResubmit(patentId: number) {
      this.submissionStatus.set(patentId, false); // Allow resubmission for the specific patent
      this.selectedActions.delete(patentId); // Clear the previously selected action
    }
    viewPatentDetails(patentId: number) {
      this.router.navigate(['/buyer-details', patentId]); // Pass patentId in the route
    }
  }
  

