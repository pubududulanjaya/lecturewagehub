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

  constructor(
    private http: HttpClient,
    private lecturerviewService: LecturerviewService,
    private moduleService: ModuleService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

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
    const moduleData = {
      ModuleName: this.ModuleName,
      ModuleCode: this.ModuleCode,
      LecturerName: this.selectedLecturer, // Update property name
      Hours: this.Hours
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