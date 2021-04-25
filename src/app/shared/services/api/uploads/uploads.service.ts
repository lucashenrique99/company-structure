import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  private readonly API_URL: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.API_URL = `${environment.apiUrl}/uploads`;
  }


  upload(file: File) {
    const form = new FormData();
    form.append("file", file);

    return this.http.post<{ url: string }>(this.API_URL, form);
  }

  getUploadSettings() {
    return {
      url: this.API_URL,
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    }
  }

}
