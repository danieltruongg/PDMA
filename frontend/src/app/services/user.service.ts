import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:8080/33158312/daniel';
const API_URL = `${BASE_URL}/api/v1`;
const USER_API_URL = `${API_URL}/users`;

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  authenticated: boolean = false;

  signUp(data: any) {
    return this.http.post(`${USER_API_URL}/signup`, data, httpOptions);
  }

  logIn(data: any) {
    return this.http.post(`${USER_API_URL}/login`, data, httpOptions);
  }

  isAuthenticated() {
    return this.authenticated;
  }

  flipAuthentication() {
    if (this.authenticated) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
  }
}
