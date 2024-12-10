import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Package } from '../../models/package';
import { PackageService } from '../services/package.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  packageIdInput: string = '';
  destinationInput: string = '';
  packages: Package[] = [];

  constructor(private packageDb: PackageService, private router: Router) {}

  ngOnInit() {
    this.packageDb.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  updPackage() {
    let details = {
      package_id: this.packageIdInput,
      package_destination: this.destinationInput
    }

    this.packageDb.updPackage(details).subscribe({
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
