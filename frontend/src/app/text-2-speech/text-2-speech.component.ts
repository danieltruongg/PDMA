import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { UppNamePipe } from '../pipes/upp-name.pipe';
import { Driver } from '../../models/driver';
import { DriverService } from '../services/driver.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-2-speech',
  standalone: true,
  imports: [FormsModule, UppNamePipe],
  templateUrl: './text-2-speech.component.html',
  styleUrl: './text-2-speech.component.css'
})
export class Text2SpeechComponent {
  drivers: Driver[] = [];
  socket: any;
  showAudio: boolean = false;
  audio: any;

  constructor(private driverDb: DriverService) {
    this.socket = io();
  }

  ngOnInit() {
    this.driverDb.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
    this.listen2Events();
  }

  listen2Events() {
    this.socket.on("text2SpeechResult", (result: any) => {
      const blob = new Blob([result.audioContent], {type: 'audio/mp3'});
      this.audio = URL.createObjectURL(blob);
      this.showAudio = true;
    });
  }

  convert(licence: string) {
    this.socket.emit("text2SpeechCall", licence);
  }
}
