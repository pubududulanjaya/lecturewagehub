import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LecturerviewService } from 'src/app/lecturerview.service';

import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hoddashboard',
  templateUrl: './hoddashboard.component.html',
  styleUrls: ['./hoddashboard.component.css'],
})
export class HoddashboardComponent implements OnInit {
  LecturerArray: any[] = [];
  ModuleData: any[] = [];
  selectedLecturer: any;
  Department: string | null =null;
  filteredItems: any[] =[];

  constructor(
    private http: HttpClient,
    private lecturerviewService: LecturerviewService,
  
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.Department = this.cookieService.get('Department');

    this.route.params.subscribe(params => {
      this.Department = params['Department'] || this.Department;
    });

    this.getAllLecturers();
  }
  

  
  getAllLecturers() {
    // Assuming you have an API endpoint that returns lecturers filtered by department
    this.http.get(`http://localhost:8000/lectureDetails/getAll?Department=${this.Department}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.LecturerArray = resultData.data;
        this.filteredItems=this.LecturerArray.filter(item => item.Department === this.Department );
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

  approveLecturer(lecturer: any) {
    // Add your logic for approving a lecturer
    console.log('Lecturer Approved:', lecturer);

    // You can add logic here to send data to the admin panel
    // For example, you can make an HTTP request to the admin panel endpoint
    this.http.post('http://localhost:8000/admin/approveLecturer', lecturer)
      .subscribe(
        (response: any) => {
          console.log('Approval response:', response);
          // Handle the response as needed
        },
        (error: any) => {
          console.error('Error approving lecturer:', error);
          // Handle the error as needed
        }
      );
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