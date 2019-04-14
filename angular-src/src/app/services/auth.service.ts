import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev: any;
  endPointDomain: any;

  constructor(private http: Http) {
      this.isDev = false;  // Change to false before deployment
      this.endPointDomain = this.isDev ? "http://localhost:8080/" : ''
      }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endPointDomain +'users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endPointDomain + 'users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.endPointDomain + 'users/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem(this.endPointDomain + 'user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  forgotPasswordService(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.endPointDomain + 'users/forgotpassword';
    return this.http.post(ep, email,{headers: headers})
      .map(res => res.json());
  }

  resetPasswordService(password){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.endPointDomain + 'users/resetpassword';
    return this.http.post(ep, password,{headers: headers})
      .map(res => res.json());
  }

}
