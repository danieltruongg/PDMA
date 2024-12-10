import { Component } from '@angular/core';
import { MiscService } from '../services/misc.service';
import { DriverService } from '../services/driver.service';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {

  stats: any = '';
  numDrivers: number = 0;
  numPackages: number = 0;

  constructor(private misc: MiscService, private driverDb: DriverService, private packageDb: PackageService) {}

  ngOnInit() {
    this.misc.getStats().subscribe((data: any) => {
      console.log(data)
      this.stats = data;
    });

    this.driverDb.getDrivers().subscribe((data: any) => {
      console.log(data)
      this.numDrivers = data.length;
    });

    this.packageDb.getPackages().subscribe((data: any) => {
      console.log(data)
      this.numPackages = data.length;
    });
  }
}
