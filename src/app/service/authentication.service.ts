import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from '@app/_interfaces/users/user-auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // login(username, password) {
  login(user: UserAuth) {
    //console.log('login');
    return this.http.post<any>(`${environment.apiUrl}/authenticate.php`, { username: user.username, password: user.password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        //console.log('user stored');
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    //console.log('logout');
  }

}
