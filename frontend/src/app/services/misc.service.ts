import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:8080/33158312/daniel';
const API_URL = `${BASE_URL}/api/v1`;

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(private http:HttpClient) {}

  getStats() {
    return this.http.get(`${API_URL}/statistics`);
  }
}
