import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlToolService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {

  }
  getControlToolList() {
    return this.http.get(`${this.baseUrl}/getAllControlTool.php?`);
  }
}
