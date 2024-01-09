// salary-certificate.component.ts

import { Component, OnInit } from '@angular/core';
import { WordFileService } from 'src/app/word-file.service';
import { LecturerService } from 'src/app/lecturer.service';

@Component({
  selector: 'app-salary-certificate',
  templateUrl: './salary-certificate.component.html',
  styleUrls: ['./salary-certificate.component.css']
})
export class SalaryCertificateComponent implements OnInit {
  lecturerDetails: any;  // Assuming lecturer details are of any type

  constructor(
    private wordFileService: WordFileService,
    private lecturerService: LecturerService
  ) {}

  ngOnInit(): void {
    // Provide the lecturer name you want to fetch details for
    const LecturerName = ' ';

    // Call the service method to get lecturer details
    this.lecturerService.getLecturerDetailsByName(LecturerName).subscribe(
      (data) => {
        this.lecturerDetails = data;
        // You can now use this.lecturerDetails in your template to display relevant details
      },
      (error) => {
        console.error('Error fetching lecturer details:', error);
      }
    );
  }

  downloadWordFile(): void {
    // You can provide the data needed for the Word document
    const data = 'Your HTML content for the Word document goes here';

    // Generate and download the Word file
    this.wordFileService.generateWordFile(data);
  }
}
