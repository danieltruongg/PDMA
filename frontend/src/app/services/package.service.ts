import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:8080/33158312/daniel';
const API_URL = `${BASE_URL}/api/v1`;
const PACKAGE_API_URL = `${API_URL}/packages`;

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http:HttpClient) {}

  getPackages() {
    return this.http.get(`${PACKAGE_API_URL}/`);
  }

  addPackage(data: any) {
    return this.http.post(`${PACKAGE_API_URL}/add`, data, httpOptions);
  }

  delPackage(data: string) {
    return this.http.delete(`${PACKAGE_API_URL}/delete/${data}`);
  }

  updPackage(data: any) {
    return this.http.put(`${PACKAGE_API_URL}/update`, data, httpOptions);
  }
}
