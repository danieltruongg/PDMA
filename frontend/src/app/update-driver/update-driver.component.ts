import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from '../../models/driver';
import { DriverService } from '../services/driver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {

  driverIdInput: string = '';
  departmentInput: string = '';
  licenceInput: string = '';
  drivers: Driver[] = [];

  constructor(private driverDb: DriverService, private router: Router) {}

  ngOnInit() {
    this.driverDb.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  updDriver() {
    let details = {
      id: this.driverIdInput,
      driver_licence: this.licenceInput,
      driver_department: this.departmentInput
    }

    this.driverDb.updDriver(details).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['list-drivers']);
      }, 

      error: error => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
