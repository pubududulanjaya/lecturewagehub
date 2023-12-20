// addfaculty.component.ts
import { Component, OnInit } from '@angular/core';
import { AddfacultyService } from 'src/app/addfaculty.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

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
  message: string = '';
  dialogOpen: boolean = false;
  newDepartment: string = '';
  selectedFaculty: any;

  constructor(private http: HttpClient, private addfacultyService: AddfacultyService, public dialog: MatDialog) {}

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
  }

  getAllFaculties() {
    this.http.get("http://localhost:8000/faculty/getAll")
      .subscribe((resultData: any) => {
        console.log("Faculties data:", resultData);
        this.facultyArray = resultData.data;
      });
  }

  getAllDepartments() {
    this.http.get("http://localhost:8000/department/getAll")  // Adjust the URL if needed
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

  updateDepartment(faculty: any) {
    const updatedDepartments = faculty.DepartmentName.join(', ');

    const newDepartment = prompt('Enter updated department names:', updatedDepartments);
    
    if (newDepartment) {
      const updatedDepartmentsArray = newDepartment.split(',').map(name => name.trim());

      this.addfacultyService.updateFaculty(faculty._id, { DepartmentName: updatedDepartmentsArray })
        .subscribe(
          (response: any) => {
            if (response.status === true) {
              this.message = 'Departments updated successfully';
              this.getAllFaculties();
            } else {
              this.message = 'Failed to update Departments: ' + response.message;
            }
          },
          (error) => {
            this.message = 'Error: ' + error.message;
          }
        );
    }
  }

  openDialog(faculty: any): void {
    this.selectedFaculty = faculty;
    this.dialogOpen = true;
  }

  saveDepartment(): void {
    if (this.newDepartment) {
      const updatedFaculty = { ...this.selectedFaculty };
      updatedFaculty.DepartmentName.push(this.newDepartment.trim());

      this.addfacultyService.updateFaculty(updatedFaculty._id, { DepartmentName: updatedFaculty.DepartmentName })
        .subscribe(
          (response: any) => {
            if (response.status === true) {
              this.message = 'Department added successfully';
              this.getAllFaculties();
            } else {
              this.message = 'Failed to add Department: ' + response.message;
            }
          },
          (error) => {
            this.message = 'Error: ' + error.message;
          }
        );
      
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.dialogOpen = false;
    this.newDepartment = '';
  }
}