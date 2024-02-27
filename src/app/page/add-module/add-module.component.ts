import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/module.service';
import { LecturerviewService } from 'src/app/lecturerview.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {
  LecturerArray: any[] = [];
  selectedLecturer: string = ''; // Update property name

  ModuleName: string = '';
  ModuleCode: string = '';
  Hours: string = '';
  Department: string = '';
  filteredItems: any[] =[];

  constructor(
    private http: HttpClient,
    private lecturerviewService: LecturerviewService,
    private moduleService: ModuleService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
      this.Department = this.cookieService.get('Department');

     // Subscribe to route parameters and update Department if provided
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

  save() {
    const moduleData = {
      ModuleName: this.ModuleName,
      ModuleCode: this.ModuleCode,
      LecturerName: this.selectedLecturer, // Update property name
      Hours: this.Hours,
      Department: this.Department,
    };

    this.moduleService.addmodule(moduleData)
      .subscribe((response: any) => {
        if (response.status === true) {
          alert('Module added successfully');
        } else {
          alert('Failed to add Module: ' + response.message);
        }
      });
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