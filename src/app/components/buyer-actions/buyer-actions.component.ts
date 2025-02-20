import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
interface BuyerAction {
  buyer_email: string;
  first_name: string;
  last_name: string;
  patent_number: string;
  action: string;
  timestamp: string;
}

@Component({
  selector: 'app-buyer-actions',
   standalone: true,
    imports: [FormsModule, CommonModule],
  templateUrl: './buyer-actions.component.html',
  styleUrls: ['./buyer-actions.component.css']
})
export class BuyerActionsComponent implements OnInit {
  buyerActions: BuyerAction[] = [];
  filteredActions: BuyerAction[] = [];

  // Filter fields
  emailFilter: string = '';
  actionFilter: string = '';
  patentFilter:string='';
  dateFrom: string = '';
  dateTo: string = '';
  baseUrl=environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBuyerActions();
  }

  fetchBuyerActions() {
    this.http.get<BuyerAction[]>(`${this.baseUrl}/buyer-actions/`).subscribe(data => {
      this.buyerActions = data;
      this.filteredActions = data; // Initialize filtered list
    });
  }

  applyFilters() {
    this.filteredActions = this.buyerActions.filter(action => {
      const matchesEmail = this.emailFilter ? action.buyer_email.includes(this.emailFilter) : true;
      const matchesAction = this.actionFilter ? action.action.toLowerCase().includes(this.actionFilter.toLowerCase()) : true;
      const matchesPatent = this.patentFilter ? action.patent_number.toLowerCase().includes(this.patentFilter.toLowerCase()) : true;
      const actionDate = new Date(action.timestamp);
      const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
      const toDate = this.dateTo ? new Date(this.dateTo) : null;

      const matchesDate =
        (!fromDate || actionDate >= fromDate) &&
        (!toDate || actionDate <= toDate);

      return matchesEmail && matchesAction && matchesPatent&&matchesDate;
    });
  }
}
