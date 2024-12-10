import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from '../../models/driver';
import { DriverService } from '../services/driver.service';
import { PackageService } from '../services/package.service';
import { Router } from '@angular/router';
import { Package } from '../../models/package';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  titleInput: string = '';
  descriptionInput: string = '';
  weightInput: string = '';
  destinationInput: string = '';
  driverIdInput: string = '';
  isAllocatedInput: boolean = false;
  drivers: Driver[] = [];

  constructor(private driverDb: DriverService, private packageDb: PackageService, private router: Router) {}

  ngOnInit() {
    this.driverDb.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  addPackage() {
    let pkg = new Package(
      this.titleInput,
      this.weightInput,
      this.destinationInput,
      this.descriptionInput,
      this.isAllocatedInput,
      this.driverIdInput
    );

    this.packageDb.addPackage(pkg).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['list-packages']);
      }, 

      error: error => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
