import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KilogramGramPipe } from '../pipes/kilogram-gram.pipe';
import { Package } from '../../models/package';
import { PackageService } from '../services/package.service';
import { io } from 'socket.io-client';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [FormsModule, KilogramGramPipe],
  templateUrl: './generative-ai.component.html',
  styleUrl: './generative-ai.component.css'
})
export class GenerativeAiComponent {

  socket: any;
  packages: Package[] = [];
  showDistance: boolean = false;
  result: string = '';
  destination: string = '';

  constructor(private packageDb: PackageService) {
    this.socket = io();
  }

  ngOnInit() {
    this.packageDb.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
    this.listen2Events();
  }

  listen2Events() {
    this.socket.on("generativeAiResult", (distance: string, destination: string) => {
      this.result = distance;
      this.destination = destination;
      this.showDistance = true;
    });
  }

  calcDistance(destination: string) {
    this.socket.emit("generativeAiCall", destination);
  }

}
