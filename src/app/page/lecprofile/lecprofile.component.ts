import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecturerService } from 'src/app/lecturer.service';
import { OtherpaymentService } from 'src/app/otherpayment.service'; // Import the OtherpaymentService

@Component({
    selector: 'app-lecprofile',
    templateUrl: './lecprofile.component.html',
    styleUrls: ['./lecprofile.component.css']
})
export class LecprofileComponent implements OnInit {
    lecturerDetails: any;
    LecturerName!: string;
    Title!: string;
    otherPayments: any[] = []; // Array to store other payment data

    constructor(
        private lecturerService: LecturerService,
        private otherPaymentService: OtherpaymentService, // Inject OtherpaymentService
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.LecturerName = params.get('LecturerName') || '';
  
        this.lecturerService.getLecturerDetails(this.LecturerName).subscribe(
          (data: any) => {
            this.lecturerDetails = data;
            this.Title = data.Title; // Set the Title from the fetched data
          },
          (error) => {
            console.error('Error fetching lecturer details:', error);
          }
        );

        // Fetch other payments data
        this.otherPaymentService.getPayments(this.LecturerName).subscribe(
          (data: any) => {
            this.otherPayments = data;
          },
          (error) => {
            console.error('Error fetching other payments:', error);
          }
        );
      });
    }
  }
