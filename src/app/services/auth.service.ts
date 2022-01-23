import { HttpClient } from '@angular/common/http';
import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: string = '';

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get getUser() {
    return this.user
  }

  get token() {
    return localStorage.getItem('jc-token') || ''
  }

  saveLocalStorage(token: string) {
    const storeToken = 'Bearer ' + token
    localStorage.setItem('jc-token', storeToken);
  }

  createUser(form: any) {
    const url = `${this.baseUrl}/auth/register`
    return this.http.post(url, form)
                    .pipe(
                      tap((resp: any) => {
                        this.saveLocalStorage(resp.token)                        
                      })
                    )
  }

  loginUser(form: any) {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post(url, form)
                    .pipe(
                      tap((resp: any) => {
                        console.log(resp)
                        this.saveLocalStorage(resp.token)
                        this.user = resp.user.name
                      })
                    )
  }

  logOut() {
    localStorage.removeItem('jc-token');
  };

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`
    return this.http.get(url, {
      headers: {
        'Authorization': this.token
      }
    }).pipe(
      map((data:any) => {
        const {token, user } = data;
        this.user = user.name;
        this.saveLocalStorage(token);
        return true
      }),
      catchError(err => {
        return of(false)
      })
    )
  }

}
