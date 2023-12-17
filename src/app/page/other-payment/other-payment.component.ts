import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { LecturerviewService } from 'src/app/lecturerview.service';
import { OtherpaymentService } from 'src/app/otherpayment.service';

@Component({
  selector: 'app-other-payment',
  templateUrl: './other-payment.component.html',
  styleUrls: ['./other-payment.component.css']
})
export class OtherPaymentComponent implements OnInit{
  LecturerArray: any[] = [];
  selectedLecturer: string = '';

  LecturerName: string = ''; // Initialize the properties
  Description: string = '';
  TotalPayments: string = '';

  constructor(
    private http: HttpClient, 
    private otherpaymentService: OtherpaymentService, 
    private lecturerviewService: LecturerviewService) 
    {}

  ngOnInit() {
    this.getAllLecturers();
  }

  getAllLecturers() {
    this.http.get("http://localhost:8000/lectureDetails/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.LecturerArray = resultData.data;
      });
  }

  save() {
    const otherpaymentData = {
     
      LecturerName: this.selectedLecturer, // Access the properties here
      Description: this.Description,
      TotalPayments: this.TotalPayments
    };

   this.otherpaymentService.otherpayment(otherpaymentData)
      .subscribe((response: any) => {
        if (response.status === true) {
          alert('Payment added successfully'); // Show a simple alert
        } else {
          alert('Failed to add Payment: ' + response.message); // Show an alert with an error message
        }
      });
  }
}