import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordFileService } from 'src/app/word-file.service';
import { LecturerService } from 'src/app/lecturer.service';
import { OtherpaymentService } from 'src/app/otherpayment.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary-certificate',
  templateUrl: './salary-certificate.component.html',
  styleUrls: ['./salary-certificate.component.css']
})
export class SalaryCertificateComponent implements OnInit {
  lecturerDetails: any;
  LecturerName!: string;
  otherPayments: any[] = []; // Array to store other payment data
  LecturerArray: any[] = []; 
  filteredItems: any[] = []; 

  constructor(
    private wordFileService: WordFileService,
    private lecturerService: LecturerService,
    private route: ActivatedRoute,
    private otherPaymentService: OtherpaymentService, 
    private http: HttpClient,
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
    this.getAllLecturers();
  }

  getAllLecturers(): void {
    this.http.get<any>('http://localhost:8000/lectureDetails/getAll')
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.LecturerArray = resultData.data;
        this.filterLecturers();
      });
  }

  filterLecturers(): void {
    if (this.LecturerName.trim() !== '') {
      this.filteredItems = this.LecturerArray.filter((lecturer) =>
        lecturer.LecturerName === this.LecturerName
      );
    } else {
      this.filteredItems = this.LecturerArray;
    }
    if(this.filteredItems.length === 0){
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'NOT found',
        showConfirmButton: false,
      });
      return;
    }
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
