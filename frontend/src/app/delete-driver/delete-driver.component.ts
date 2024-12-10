import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../services/driver.service';
import { Router } from '@angular/router';
import { Driver } from '../../models/driver';
import { UppNamePipe } from '../pipes/upp-name.pipe';
import { KilogramGramPipe } from '../pipes/kilogram-gram.pipe';
import { LocaleDatePipe } from '../pipes/locale-date.pipe';


@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule, UppNamePipe, LocaleDatePipe],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {

  drivers: Driver[] = [];

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
        this.router.navigate(['list-drivers']);
      }, 

      error: error => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      }
    });
  }


}
