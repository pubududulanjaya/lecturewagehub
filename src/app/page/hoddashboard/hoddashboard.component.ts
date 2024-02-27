// Import necessary modules and services
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LecturerviewService } from 'src/app/lecturerview.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Define the Report interface
interface lecturer {
  id: string;
  LecturerName: string;
  Title:string;
  MobileNumber:string;
  NIC:string;
  AddressLine1:string;
  AddressLine2:string;
  State:string;
  Email:string;
  SalaryType:string;
  MonthlyPayment:string;
  RatePerHour:string;
  AccountName:string;
  AccountNumber:string;
  BankName:string;
  bankCode:string;
  BranchName:string;
  BranchCode:string;
  Request_State: string;
  Department:string;
}

@Component({
  selector: 'app-hoddashboard',
  templateUrl: './hoddashboard.component.html',
  styleUrls: ['./hoddashboard.component.css'],
})
export class HoddashboardComponent implements OnInit {
  LecturerArray: any[] = [];
  ModuleData: any[] = [];
  selectedLecturer: any;
  Department: string | null = null;
  filteredItems: any[] = [];
  public Request_State: string = '';

  constructor(
    private http: HttpClient,
    private lecturerviewService: LecturerviewService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.Department = this.cookieService.get('Department');

    this.route.params.subscribe((params) => {
      this.Department = params['Department'] || this.Department;
    });

    this.getAllLecturers();
    this.getAllModules();
  }

  getAllLecturers() {
    // Assuming you have an API endpoint that returns lecturers filtered by department
    this.http
      .get(`http://localhost:8000/lectureDetails/getAll?Department=${this.Department}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.LecturerArray = resultData.data;
        this.filteredItems = this.LecturerArray.filter((item) => item.Department === this.Department);
      });
  }

  getAllModules() {
    this.http.get("http://localhost:8000/module/getAll")
      .subscribe((resultData: any) => {
        console.log("Modules data:", resultData);
        this.ModuleData = resultData.data;
      });
  }

  getModuleName(LecturerName: string): string {
    console.log("Searching for module for lecturer:", LecturerName);
    const moduleMatch = this.ModuleData.find(module => module.LecturerName === LecturerName);
    console.log("Matched module:", moduleMatch);
    return moduleMatch ? moduleMatch.ModuleName : 'Not Found';
  }

  getHours(LecturerName: string): string {
    console.log("Searching for module for lecturer:", LecturerName);
    const moduleMatch = this.ModuleData.find(module => module.LecturerName === LecturerName);
    console.log("Matched module:", moduleMatch);
    return moduleMatch ? moduleMatch.Hours : 'Not Found';
  }

  viewStatus(lecturer: any) {
    this.selectedLecturer = lecturer;
    this.lecturerviewService.setLecturer(this.selectedLecturer);
  }

  performAfterViewingAllData() {
    // Add your logic here
    console.log("Viewing all data is complete. Performing additional action.");
    // For example, you can trigger another function or display a message.
  }

  updateState(data: any): void {
    const updatedlecturer: lecturer = { ...data, Request_State: 'admin_pendding' };
    
    this.http.patch(`http://localhost:8000/lectureDetails/update/${data.id}`, updatedlecturer)
      .subscribe(
        (response) => {
          console.log(response);
          alert('Report State updated to admin pending');
          // Assuming the response includes the updated data, you can refresh the view with the updated data
          this.getAllLecturers(); // Refresh the data after updating the State
        },
        (error) => {
          console.error('Error updating report State:', error);
        }
      );
  }
  

  logout() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logged out successfully',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      // Clear cookies and navigate to the login page
      this.cookieService.delete('Department');
      this.router.navigate(['/login']); // Replace '/login' with the path to your login page
    });
  }
}
