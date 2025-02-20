/* import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
   standalone: true, // Declare the component as standalone
  imports: [FormsModule, CommonModule], 
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  sellerData: any[] = [];
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSellerData();
  }

  fetchSellerData() {
    this.http.get('http://localhost:8000/api/accounts/seller-data/').subscribe(
      (response: any) => {
        this.sellerData = response;
      },
      (error) => {
        console.error('Error fetching seller data:', error);
      }
    );
  }

  verifySeller(id: number, verifiedBy: string, additionalNotes: string) {
    const payload = {
      verified: true,
      verified_by: verifiedBy,
      additional_notes: additionalNotes,
    };

    this.http.patch(`http://localhost:8000/api/verify-seller/${id}/`, payload).subscribe(
      (response) => {
        this.message = 'Seller data verified successfully!';
        this.fetchSellerData();
      },
      (error) => {
        console.error('Error verifying seller data:', error);
      }
    );
  }
}
 */
/* import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  sellerData: any[] = [];
  filteredData: any[] = []; // To store filtered results
  selectedSeller: any = null; // Seller selected for verification/unverification
  message: string = '';
  important: boolean = false; // Extra field for verification
  additionalNotes: string = ''; // Extra field for verification
  filter: any = {
    email: '',
    verified: '',
    important: '',
  }; // Filters for queries

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSellerData();
  }

  // Fetch all seller data
  fetchSellerData() {
    this.http.get('http://localhost:8000/api/accounts/seller-data/').subscribe(
      (response: any) => {
        this.sellerData = response;
        this.filteredData = [...this.sellerData]; // Initialize filtered data
      },
      (error) => {
        console.error('Error fetching seller data:', error);
      }
    );
  }

  // Open the verification form for a specific seller
  openVerificationForm(seller: any) {
    this.selectedSeller = seller;
    this.additionalNotes = '';
    this.important = seller.important || false; // Default to current value
  }

  // Submit verification for the selected seller
  verifySeller() {
    console.log('Verifying seller:', this.selectedSeller.id);
    if (!this.selectedSeller) return;

    const payload = {
      verified: true,
      important: this.important,
      additional_notes: this.additionalNotes,
    };

    this.http.patch(`http://localhost:8000/api/accounts/verify-seller/${this.selectedSeller.id}/`, payload).subscribe(
      (response) => {
        this.message = 'Seller data verified successfully!';
        this.fetchSellerData(); // Refresh data
        this.selectedSeller = null; // Close form
      },
      (error) => {
        console.error('Error verifying seller data:', error);
      }
    );
  }

  // Unverify the selected seller
  unverifySeller(seller: any) {
    const payload = {
      verified: false,
      important: false,
      additional_notes: '',
    };

    this.http.patch(`http://localhost:8000/api/accounts/verify-seller/${seller.id}/`, payload).subscribe(
      (response) => {
        this.message = 'Seller data unverified successfully!';
        this.fetchSellerData(); // Refresh data
      },
      (error) => {
        console.error('Error unverifying seller data:', error);
      }
    );
  }

  // Apply filters based on the filter object
  applyFilters() {
    this.filteredData = this.sellerData.filter((seller) => {
      const matchesEmail = this.filter.email
        ? seller.email.includes(this.filter.email)
        : true;
      const matchesVerified = this.filter.verified !== ''
        ? seller.verified === (this.filter.verified === 'true')
        : true;
      const matchesImportant = this.filter.important !== ''
        ? seller.important === (this.filter.important === 'true')
        : true;

      return matchesEmail && matchesVerified && matchesImportant;
    });
  }

  // Reset filters to view all data
  resetFilters() {
    this.filter = {
      email: '',
      verified: '',
      important: '',
    };
    this.filteredData = [...this.sellerData];
  }
}

 */


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../services/file-upload.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  baseUrl=environment.apiUrl
  sellerData: any[] = [];
  filteredData: any[] = [];
  selectedSeller: any = null;
  selectedFeedback: any = null;
  message: string = '';
  important: boolean = false;
  additionalNotes: string = '';
  entityStatus: string = 'active';  // Default to 'active'
  acquisitionStatus: string = 'open';  // Default to 'open'
  bayRating: string = 'medium';  // Default to 'medium'
  enforceability: string = 'medium';  // Default to 'medium'
  target: string = '';  // Default to empty string
  companyName: string = '';  // Default to empty string
  adminContact: string = '';  // Default to empty string
  adminEmail: string = '';  // Default to empty string
  upcomingFees: string = '';  // Default to empty string
  title: string = '';  // Default to empty string
  abstract: string = '';  // Default to empty string
  firstClaim: string = '';  // Default to empty string
  filingDate: Date | null = null;  // Default to null if not provided
  grantDate: Date | null = null;  // Default to null if not provided
  currentAssignee: string = '';  // Default to empty string
  ipType: string = '';  // Default to empty string
  familyMembers: string = 'single';  // Default to 'single'
  concepts: string = '';  // Default to empty string
  keywords: string = '';  // Default to empty string
  technologies: string = '';  // Default to empty string
  patent_number:string='';
  filter: any = {
    email: '',
    verified: '',
    important: '',
  };
  selectedFile: File | null = null;
  uploadStatus: string = '';
  router: any;
  
  
  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService
    
  ) {}
  ngOnInit() {
    this.fetchSellerData();
  }

  
  fetchSellerData() {
    this.http.get(`${this.baseUrl}/seller-da/`).subscribe(
      (response: any) => {
        this.sellerData = response;
        this.filteredData = [...this.sellerData];
      },
      (error) => {
        console.error('Error fetching seller data:', error);
      }
    );
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.uploadStatus = 'Please select a file to upload.';
      return;
    }

    this.fileUploadService.uploadFile(this.selectedFile).subscribe({
      next: (response) => {
        this.uploadStatus = 'File uploaded successfully!';
      },
      error: (error) => {
        this.uploadStatus = `Error uploading file: ${error.error?.error || 'Unknown error'}`;
      },
    });
  }
  openVerificationForm(seller: any) {
    this.selectedSeller = seller;
    
    // Initialize or reset all the fields from the seller object
    this.additionalNotes = seller.additional_notes || '';  // Initialize additional notes
    this.important = seller.important || false;  // Default to current value
  
    // Initialize all the fields to match the model from seller data
    this.entityStatus = seller.entity_status || 'active';  // Default to 'active'
    this.acquisitionStatus = seller.acquisition_status || 'open';  // Default to 'open'
    this.bayRating = seller.bay_rating || 'medium';  // Default to 'medium'
    this.enforceability = seller.enforceability || 'medium';  // Default to 'medium'
    this.target = seller.target || '';  // Default to empty string
    this.companyName = seller.company_name || '';  // Default to empty string
    this.adminContact = seller.admin_contact || '';  // Default to empty string
    this.adminEmail = seller.admin_email || '';  // Default to empty string
    this.upcomingFees = seller.upcoming_fees || '';  // Default to empty string
    this.title = seller.title || '';  // Default to empty string
    this.abstract = seller.abstract || '';  // Default to empty string
    this.firstClaim = seller.first_claim || '';  // Default to empty string
    this.filingDate = seller.filing_date || null;  // Default to null if not provided
    this.grantDate = seller.grant_date || null;  // Default to null if not provided
    this.currentAssignee = seller.current_assignee || '';  // Default to empty string
    this.ipType = seller.ip_type || '';  // Default to empty string
    this.familyMembers = seller.family_members || 'single';  // Default to 'single'
    this.concepts = seller.concepts || '';  // Default to empty string
    this.keywords = seller.keywords || '';  // Default to empty string
    this.technologies = seller.technologies || '';  // Default to empty string
  }
  

  // Submit verification for the selected seller
  verifySeller() {
    console.log('Verifying seller:', this.selectedSeller.id);
    if (!this.selectedSeller) return;

    const payload = {
      verified: true,
      important: this.important,
      additional_notes: this.additionalNotes,
      entity_status: this.entityStatus,
      acquisition_status: this.acquisitionStatus,
      bay_rating: this.bayRating,
      enforceability: this.enforceability,
      target: this.target,
      company_name: this.companyName,
      admin_contact: this.adminContact,
      admin_email: this.adminEmail,
      upcoming_fees: this.upcomingFees,
      title: this.title,
      abstract: this.abstract,
      first_claim: this.firstClaim,
      filing_date: this.filingDate,
      grant_date: this.grantDate,
      current_assignee: this.currentAssignee,
      ip_type: this.ipType,
      family_members: this.familyMembers,
      concepts: this.concepts,
      keywords: this.keywords,
      technologies: this.technologies
    };

    this.http.patch(`http://localhost:8000/api/accounts/verify-seller/${this.selectedSeller.id}/`, payload).subscribe(
      (response) => {
        this.message = 'Seller data verified successfully!';
        this.fetchSellerData(); // Refresh data
        this.selectedSeller = null; // Close form
      },
      (error) => {
        console.error('Error verifying seller data:', error);
      }
    );
  }

  // Unverify the selected seller
  unverifySeller(seller: any) {
    const payload = {
      verified: false,
      important: false,
      additional_notes: '',
    };

    this.http.patch(`http://localhost:8000/api/accounts/verify-seller/${seller.id}/`, payload).subscribe(
      (response) => {
        this.message = 'Seller data unverified successfully!';
        this.fetchSellerData(); // Refresh data
      },
      (error) => {
        console.error('Error unverifying seller data:', error);
      }
    );
  }

  // Apply filters based on the filter object
  applyFilters() {
    this.filteredData = this.sellerData.filter((seller) => {
      const matchesEmail = this.filter.email
        ? seller.email.includes(this.filter.email)
        : true;
      const matchesVerified = this.filter.verified !== ''
        ? seller.verified === (this.filter.verified === 'true')
        : true;
      const matchesImportant = this.filter.important !== ''
        ? seller.important === (this.filter.important === 'true')
        : true;

      return matchesEmail && matchesVerified && matchesImportant;
    });
  }

  // Reset filters to view all data
  resetFilters() {
    this.filter = {
      email: '',
      verified: '',
      important: '',
    };
    this.filteredData = [...this.sellerData];
  }


  viewFeedbackDetails(seller: any) {
    this.selectedFeedback = seller;
  }
  viewBuyerDetails() {
    this.router.navigate(['/buyer-actions']); // Pass patentId in the route
  }
}




/* import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  sellerData: any[] = [];
  filteredData: any[] = [];
  selectedSeller: any = null;
  selectedFeedback: any = null;
  message: string = '';
  important: boolean = false;
  additionalNotes: string = '';
  entityStatus: string = 'active';
  acquisitionStatus: string = 'open';
  bayRating: string = 'medium';
  enforceability: string = 'medium';
  target: string = '';
  companyName: string = '';
  adminContact: string = '';
  adminEmail: string = '';
  upcomingFees: string = '';
  title: string = '';
  abstract: string = '';
  firstClaim: string = '';
  filingDate: Date | null = null;
  grantDate: Date | null = null;
  currentAssignee: string = '';
  ipType: string = '';
  familyMembers: string = 'single';
  concepts: string = '';
  keywords: string = '';
  technologies: string = '';
  filter: any = {
    email: '',
    verified: '',
    important: '',
  };

  selectedFile: File | null = null;
  uploadStatus: string = '';

  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit() {
    this.fetchSellerData();
  }

  fetchSellerData() {
    this.http.get('http://localhost:8000/api/accounts/seller-da/').subscribe(
      (response: any) => {
        this.sellerData = response;
        this.filteredData = [...this.sellerData];
      },
      (error) => {
        console.error('Error fetching seller data:', error);
      }
    );
  }

  openVerificationForm(seller: any) {
    this.selectedSeller = seller;

    this.additionalNotes = seller.additional_notes || '';
    this.important = seller.important || false;
    this.entityStatus = seller.entity_status || 'active';
    this.acquisitionStatus = seller.acquisition_status || 'open';
    this.bayRating = seller.bay_rating || 'medium';
    this.enforceability = seller.enforceability || 'medium';
    this.target = seller.target || '';
    this.companyName = seller.company_name || '';
    this.adminContact = seller.admin_contact || '';
    this.adminEmail = seller.admin_email || '';
    this.upcomingFees = seller.upcoming_fees || '';
    this.title = seller.title || '';
    this.abstract = seller.abstract || '';
    this.firstClaim = seller.first_claim || '';
    this.filingDate = seller.filing_date || null;
    this.grantDate = seller.grant_date || null;
    this.currentAssignee = seller.current_assignee || '';
    this.ipType = seller.ip_type || '';
    this.familyMembers = seller.family_members || 'single';
    this.concepts = seller.concepts || '';
    this.keywords = seller.keywords || '';
    this.technologies = seller.technologies || '';
  }

  verifySeller() {
    if (!this.selectedSeller) return;

    const payload = {
      verified: true,
      important: this.important,
      additional_notes: this.additionalNotes,
      entity_status: this.entityStatus,
      acquisition_status: this.acquisitionStatus,
      bay_rating: this.bayRating,
      enforceability: this.enforceability,
      target: this.target,
      company_name: this.companyName,
      admin_contact: this.adminContact,
      admin_email: this.adminEmail,
      upcoming_fees: this.upcomingFees,
      title: this.title,
      abstract: this.abstract,
      first_claim: this.firstClaim,
      filing_date: this.filingDate,
      grant_date: this.grantDate,
      current_assignee: this.currentAssignee,
      ip_type: this.ipType,
      family_members: this.familyMembers,
      concepts: this.concepts,
      keywords: this.keywords,
      technologies: this.technologies,
    };

    this.http.patch(`http://localhost:8000/api/accounts/verify-seller/${this.selectedSeller.id}/`, payload).subscribe(
      (response) => {
        this.message = 'Seller data verified successfully!';
        this.fetchSellerData();
        this.selectedSeller = null;
      },
      (error) => {
        console.error('Error verifying seller data:', error);
      }
    );
  }

  unverifySeller(seller: any) {
    const payload = {
      verified: false,
      important: false,
      additional_notes: '',
    };

    this.http.patch(`http://localhost:8000/api/accounts/verify-seller/${seller.id}/`, payload).subscribe(
      (response) => {
        this.message = 'Seller data unverified successfully!';
        this.fetchSellerData();
      },
      (error) => {
        console.error('Error unverifying seller data:', error);
      }
    );
  }

  applyFilters() {
    this.filteredData = this.sellerData.filter((seller) => {
      const matchesEmail = this.filter.email
        ? seller.email.includes(this.filter.email)
        : true;
      const matchesVerified = this.filter.verified !== ''
        ? seller.verified === (this.filter.verified === 'true')
        : true;
      const matchesImportant = this.filter.important !== ''
        ? seller.important === (this.filter.important === 'true')
        : true;

      return matchesEmail && matchesVerified && matchesImportant;
    });
  }

  resetFilters() {
    this.filter = {
      email: '',
      verified: '',
      important: '',
    };
    this.filteredData = [...this.sellerData];
  }

  viewFeedbackDetails(seller: any) {
    this.selectedFeedback = seller;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.uploadStatus = 'Please select a file to upload.';
      return;
    }

    this.fileUploadService.uploadFile(this.selectedFile).subscribe({
      next: (response) => {
        this.uploadStatus = 'File uploaded successfully!';
      },
      error: (error) => {
        this.uploadStatus = `Error uploading file: ${error.error?.error || 'Unknown error'}`;
      },
    });
  }
}
 */