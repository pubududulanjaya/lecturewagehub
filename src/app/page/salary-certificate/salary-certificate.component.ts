import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordFileService } from 'src/app/word-file.service';
import { LecturerService } from 'src/app/lecturer.service';
import { OtherpaymentService } from 'src/app/otherpayment.service';

@Component({
  selector: 'app-salary-certificate',
  templateUrl: './salary-certificate.component.html',
  styleUrls: ['./salary-certificate.component.css']
})
export class SalaryCertificateComponent implements OnInit {
  lecturerDetails: any;
  LecturerName!: string;
  otherPayments: any[] = []; // Array to store other payment data


  constructor(
    private wordFileService: WordFileService,
    private lecturerService: LecturerService,
    private route: ActivatedRoute,
    private otherPaymentService: OtherpaymentService, 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.LecturerName = params.get('LecturerName') || '';

      this.fetchLecturerDetails();

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

  fetchLecturerDetails(): void {
    this.lecturerService.getLecturerDetails(this.LecturerName).subscribe(
      (data: any) => {
        this.lecturerDetails = data;
      },
      (error: any) => {
        console.error('Error fetching lecturer details:', error);
      }
    );
  }

  calculateTotalAmountSubjectToWHT(): number {
    return this.otherPayments.reduce((sum, payment) => sum + parseFloat(payment.TotalPayments), 0);
  }

  calculateTotalWHTDeducted(): number {
    return this.otherPayments.reduce((sum, payment) => sum + parseFloat(payment.WHTDeducted), 0);
  }

  calculateTotalNetAmountPaid(): number {
    return this.otherPayments.reduce((sum, payment) => sum + parseFloat(payment.TotalPayments), 0);
  }

  downloadWordFile(): void {
    const data = document.getElementById('certificate-content')?.innerHTML || '';
    const filename = 'desired-filename'; // Provide your desired filename here
    this.wordFileService.generateWordFile(data, filename);
  }
  
}
