import { Component } from '@angular/core';
import { Driver } from '../../models/driver';
import { DriverService } from '../services/driver.service';
import { UppNamePipe } from '../pipes/upp-name.pipe';
import { LocaleDatePipe } from '../pipes/locale-date.pipe';
import { Router } from '@angular/router';
import { Package } from '../../models/package';
import { KilogramGramPipe } from '../pipes/kilogram-gram.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [FormsModule, UppNamePipe, LocaleDatePipe, KilogramGramPipe],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {
  
  drivers: Driver[] = [];
  showPackages: boolean = false;
  driverPackages: Package[] = [];

  constructor(private driverDb: DriverService, private router: Router) {}

  ngOnInit() {
    this.driverDb.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  delDriver(id: string) {
    this.driverDb.delDriver(id).subscribe({
      next: data => {
        console.log(data);
        this.driverDb.getDrivers().subscribe((data: any) => {
          this.drivers = data;
        });
      }, 

      error: error => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      }
    });
  }

  disPackages(id: string) {
    this.drivers.forEach((driver: Driver) => {
      if (driver._id === id) {
        this.driverPackages = driver.assigned_packages;
      }
    });

    this.showPackages = true;
  }

}
