import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private uploadUrl = 'http://localhost:8000/api/accounts/upload_excel/'; // Replace with your endpoint

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`); // Include token if required

    return this.http.post(this.uploadUrl, formData, { headers });
  }
}