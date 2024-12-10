import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:8080/33158312/daniel';
const API_URL = `${BASE_URL}/api/v1`;
const DRIVER_API_URL = `${API_URL}/drivers`;

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private http:HttpClient) {}

  getDrivers() {
    return this.http.get(`${DRIVER_API_URL}/`);
  }

  addDriver(data: any) {
    return this.http.post(`${DRIVER_API_URL}/add`, data, httpOptions);
  }

  delDriver(data: string) {
    return this.http.delete(`${DRIVER_API_URL}/delete?driver_id=${data}`);
  }

  updDriver(data: any) {
    return this.http.put(`${DRIVER_API_URL}/update`, data, httpOptions);
  }
}
