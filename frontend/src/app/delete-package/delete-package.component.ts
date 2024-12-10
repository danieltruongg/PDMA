import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Package } from '../../models/package';
import { PackageService } from '../services/package.service';
import { Router } from '@angular/router';
import { KilogramGramPipe } from '../pipes/kilogram-gram.pipe';
import { LocaleDatePipe } from '../pipes/locale-date.pipe';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule, KilogramGramPipe, LocaleDatePipe],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {

  packages: Package[] = [];

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
        this.router.navigate(['list-packages']);
      }, 

      error: error => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
