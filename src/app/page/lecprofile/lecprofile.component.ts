import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecturerService } from 'src/app/lecturer.service';
import { TimetableService } from 'src/app/timetable.service';
import { OtherpaymentService } from 'src/app/otherpayment.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { SalaryService } from 'src/app/salary.service'; // Import the SalaryService

@Component({
  selector: 'app-lecprofile',
  templateUrl: './lecprofile.component.html',
  styleUrls: ['./lecprofile.component.css']
})
export class LecprofileComponent implements OnInit {
  lecturerDetails: any;
  LecturerName!: string;
  Title!: string;
  otherPayments: any[] = [];
  LecturerArray: any[] = [];
  filteredItems: any[] = [];
  timetableArray: any[] = [];
  totalHours: number = 0; // Variable to hold total hours
  totalSalary: number = 0;
  apiUrl = 'http://localhost:8000';

  constructor(
    private lecturerService: LecturerService,
    private otherPaymentService: OtherpaymentService,
    private route: ActivatedRoute,
    private timetableService: TimetableService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private salaryService: SalaryService // Inject SalaryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.LecturerName = params.get('LecturerName') || '';

      // Fetch lecturer details
      this.lecturerService.getLecturerDetails(this.LecturerName).subscribe(
        (data: any) => {
          this.lecturerDetails = data;
          this.Title = data.Title;
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

      // Fetch timetable data
      this.timetableService.getTimetable(this.LecturerName).subscribe(
        (data: any) => {
          this.timetableArray = data.data;

          // Calculate salary for each timetable item
          this.salaryService.calculateSalaries(this.timetableArray);

          // Calculate total hours
          this.totalHours = this.salaryService.calculateTotalHours(this.timetableArray);

          this.totalSalary = this.salaryService.calculateTotalSalary(this.timetableArray);

          
        },
        (error) => {
          console.error('Error fetching timetable:', error);
          this.showMessage('Error fetching timetable', 'error-snackbar');
        }
      );

      // Call the method to get all lecturers
      this.getAllLecturers();
    });
  }

  getAllLecturers(): void {
    this.http.get<any>(`${this.apiUrl}/lectureDetails/getAll`)
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

  showMessage(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }
}
