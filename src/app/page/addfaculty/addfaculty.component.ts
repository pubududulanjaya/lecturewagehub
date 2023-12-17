import { Component, OnInit } from '@angular/core';
import { AddfacultyService } from 'src/app/addfaculty.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addfaculty',
  templateUrl: './addfaculty.component.html',
  styleUrls: ['./addfaculty.component.css']
})
export class AddfacultyComponent implements OnInit {
  facultyName: string = '';
  departmentName: string = '';
  facultyArray: any[] = [];
  departmentArray: any[] = [];
  message: string = ''; // Add this variable for displaying messages

  constructor(private http: HttpClient, private addfacultyService: AddfacultyService) {}

  ngOnInit() {
    this.getAllFaculties();
    this.getAllDepartments();
  }

  save() {
    const addfacultyData = {
      FacultyName: this.facultyName,
      DepartmentName: this.departmentName.split(',').map(name => name.trim()),
    };

    this.addfacultyService.addfaculty(addfacultyData)
      .subscribe(
        (response: any) => {
          if (response.status === true) {
            this.message = 'Faculty added successfully';
            this.getAllFaculties();
          } else {
            this.message = 'Failed to add Faculty: ' + response.message;
          }
        },
        (error) => {
          this.message = 'Error: ' + error.message;
        }
      );

    //   if (response.status === true) {
    //     this.message = 'Department added successfully';
    //     this.getAllDepartments();
    //   } else {
    //     this.message = 'Failed to add Department: ' + response.message;
    //   }
    // },
    // (error) => {
    //   this.message = 'Error: ' + error.message;
    // }
      
  }


  getAllFaculties() {
    this.http.get("http://localhost:8000/faculty/getAll")
      .subscribe((resultData: any) => {
        console.log("Faculties data:", resultData);
        this.facultyArray = resultData.data;
      });
  }

  getAllDepartments() {
    this.http.get("http://localhost:8000/faculty/getAll")
      .subscribe((resultData: any) => {
        console.log("Departments data:", resultData);
        this.departmentArray = resultData.data;
      });
  }

  addDepartment(faculty: any) {
    const newDepartment = prompt('Enter new department name:');
    if (newDepartment) {
      faculty.DepartmentName.push(newDepartment.trim());
    }
  }

  editFaculty(faculty: any) {
    console.log('Editing faculty:', faculty);
  }
}