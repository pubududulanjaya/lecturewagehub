import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecturerService } from 'src/app/lecturer.service';
import { OtherpaymentService } from 'src/app/otherpayment.service'; // Import the OtherpaymentService
import { HttpClient } from '@angular/common/http'; // Import HttpClient module
import Swal from 'sweetalert2'; // Import SweetAlert module

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
  LecturerArray: any[] = []; 
  filteredItems: any[] = []; 
  

  constructor(
    private lecturerService: LecturerService,
    private otherPaymentService: OtherpaymentService, // Inject OtherpaymentService
    private route: ActivatedRoute,
    private http: HttpClient // Inject HttpClient module
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

      // Call the method to get all lecturers
      this.getAllLecturers();
    });
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
}
