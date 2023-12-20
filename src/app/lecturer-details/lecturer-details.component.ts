// lecturer-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecturerService } from 'src/app/lecturer.service'; // Adjust the path based on your project structure

@Component({
  selector: 'app-lecturer-details',
  templateUrl: './lecturer-details.component.html',
  styleUrls: ['./lecturer-details.component.css']
})
export class LecturerDetailsComponent implements OnInit {

  lecturerDetails: any = {};  // Replace 'any' with the interface or type of your lecturer details

  constructor(
    private route: ActivatedRoute,
    private lecturerService: LecturerService
  ) { }

  ngOnInit(): void {
    // Fetch lecturer details using the route parameters
    this.route.paramMap.subscribe(params => {
        const lecturerName = params.get('lecturerName');

        // Check if lecturerName is not null before calling the service
        if (lecturerName !== null) {
            // Call the service to fetch lecturer details
            this.lecturerService.getLecturerDetails(lecturerName).subscribe(
                (details) => {
                    console.log('Lecturer Details:', details);
                    this.lecturerDetails = details;
                },
                (error) => {
                    console.error('Error fetching lecturer details:', error);
                }
            );
        }
    });


    // Add console logs here to log information about the lecturer data
    console.log('Lecturer data:', this.lecturerDetails);
    console.log('Is lecturerDetails defined?', this.lecturerDetails !== undefined);
  }
  

  // You can add additional methods or logic here based on your requirements
}
