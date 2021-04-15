import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdProcessServiceService {

  baseUrl = environment.apiUrl;
  process: any;
  constructor(private http: HttpClient) { }

  getAllTraca(articleSap: number, workorder: number): Observable<any> {
    this.process = this.http.get(`${this.baseUrl}/getProcess.php?articleSap=${articleSap}&OF=${workorder}`);
    return this.process;
  }
  getAllProcesses(articleSap: string) {
    return this.http.get(`${this.baseUrl}/getAllProcesses.php?articleSap=${articleSap}`);
  }

  isProd(): boolean {
    return (this.process.prodProcess);
  }
  isProdOpe(prodProcess: any): boolean {
    return (prodProcess.operations);
  }
  isProdSubOpe(operation: any): boolean {
    return (operation.subOperations);
  }
  isProdStep(subOperations): boolean {
    return (subOperations.steps);
  }
  isTraca(step): boolean {
    return (step.traca);
  }
}
