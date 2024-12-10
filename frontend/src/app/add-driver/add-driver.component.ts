import { Component } from '@angular/core';
import { Driver } from '../../models/driver';
import { DriverService } from '../services/driver.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {

  nameInput: string = '';
  departmentInput: string = '';
  licenceInput: string = '';
  isActiveInput: boolean = true;

  constructor (private driverDb: DriverService, private router: Router) {}

  addDriver() {
    let driver = new Driver(
      this.nameInput, 
      this.departmentInput, 
      this.licenceInput, 
      this.isActiveInput
    )

    this.driverDb.addDriver(driver).subscribe({
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
