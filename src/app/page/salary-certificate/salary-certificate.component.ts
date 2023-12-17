// salary-certificate.component.ts

import { Component } from '@angular/core';
import { WordFileService } from 'src/app/word-file.service';

@Component({
  selector: 'app-salary-certificate',
  templateUrl: './salary-certificate.component.html',
  styleUrls: ['./salary-certificate.component.css']
})
export class SalaryCertificateComponent {

  constructor(private wordFileService: WordFileService) { }

  downloadWordFile(): void {
    // You can provide the data needed for the Word document
    const data = 'Your HTML content for the Word document goes here';

    // Generate and download the Word file
    this.wordFileService.generateWordFile(data);
  }
}
