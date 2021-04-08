import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdProcessServiceService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllTraca(articleSap: number, workorder: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProcess.php?articleSap=${articleSap}&OF=${workorder}`);
  }
  getAllProcesses(articleSap: string) {
    return this.http.get(`${this.baseUrl}/getAllProcesses.php?articleSap=${articleSap}`);
  }
}
