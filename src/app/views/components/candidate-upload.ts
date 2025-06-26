import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CandidateUploadResponse {
  name: string;
  surname: string;
  seniority: string;
  years: number;
  availability: boolean;
}

@Injectable({ providedIn: 'root' })
export class CandidateUploadService {
  private readonly uploadUrl = 'http://localhost:3000/api/candidates/upload';

  constructor(private http: HttpClient) {}

  uploadCandidate(name: string, surname: string, file: File): Observable<CandidateUploadResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('file', file);
    return this.http.post<CandidateUploadResponse>(this.uploadUrl, formData);
  }
}
