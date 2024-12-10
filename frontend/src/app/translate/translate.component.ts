import { Component } from '@angular/core';
import { KilogramGramPipe } from '../pipes/kilogram-gram.pipe';
import { FormsModule } from '@angular/forms';
import { Package } from '../../models/package';
import { PackageService } from '../services/package.service';
import { io } from 'socket.io-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [FormsModule, KilogramGramPipe],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export class TranslateComponent {

  languages: any[] = [
    {
      name: "Chinese",
      code: "zh"
    },
    {
      name: "Spanish",
      code: "es"
    },
    {
      name: "Korean",
      code: "ko"
    }
  ]
  socket: any;
  packages: Package[] = [];

  showTranslation: boolean = false;
  result: any = {text: '', lang: '', result:''};

  targetLanguage: any = "";
  translation: any = "";
  text: string = "";

  constructor(private packageDb: PackageService, private router: Router) {
    this.socket = io();
  }

  ngOnInit() {
    this.packageDb.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
    this.listen2Events();
  }

  listen2Events() {
    this.socket.on("translationResult", (result: any) => {
      this.translation = result;

      this.result = {
        text: this.text,
        lang: this.targetLanguage.name,
        result: this.translation
      }
      
      this.showTranslation = true;
      this.resetInfo();
    });
  }

  translate(description: string) {
    this.text = description;

    if (!this.targetLanguage) {
      console.log("Error: Target Language Not Selected");
      this.router.navigate(['invalid-data']);
      return;
    }

    this.targetLanguage = JSON.parse(this.targetLanguage);
    this.socket.emit("translationCall", description, this.targetLanguage.code);
  }

  resetInfo() {
    this.targetLanguage = "";
    this.translation = "";
    this.text = "";
  }
}