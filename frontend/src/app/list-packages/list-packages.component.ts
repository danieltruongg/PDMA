import { Component } from '@angular/core';
import { Package } from '../../models/package';
import { PackageService } from '../services/package.service';
import { KilogramGramPipe } from '../pipes/kilogram-gram.pipe';
import { LocaleDatePipe } from '../pipes/locale-date.pipe';
import { Router } from '@angular/router';
import { UppNamePipe } from '../pipes/upp-name.pipe';
import { Driver } from '../../models/driver';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [FormsModule, KilogramGramPipe, LocaleDatePipe, UppNamePipe],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {
  packages: Package[] = [];
  showDriver: boolean = false;
  pkgDriver: Driver = new Driver('', '', '', false);

  constructor(private packageDb: PackageService, private router: Router) {}

  ngOnInit() {
    this.packageDb.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  delPackage(id: string) {
    this.packageDb.delPackage(id).subscribe({
      next: data => {
        console.log(data);
        this.packageDb.getPackages().subscribe((data: any) => {
          this.packages = data;
        });
      }, 

      error: error => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      }
    });
  }

  disDriver(id: string) {
    this.packages.forEach((pkg: Package) => {
      if (pkg._id === id) {
        this.pkgDriver = pkg.driver_id;
      }
    });

    this.showDriver = true;
  }

}
