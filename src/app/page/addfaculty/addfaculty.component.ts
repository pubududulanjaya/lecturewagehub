import { Component, OnInit, ViewChild } from '@angular/core';
import { AddfacultyService } from 'src/app/addfaculty.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addfaculty',
  templateUrl: './addfaculty.component.html',
  styleUrls: ['./addfaculty.component.css']
})
export class AddfacultyComponent implements OnInit {
  @ViewChild('addFacultyForm') addFacultyForm!: NgForm; // ViewChild for the form
  facultyName: string = '';
  departmentName: string = '';
  facultyArray: any[] = [];
  departmentArray: any[] = [];
  message: string = '';
  dialogOpen: boolean = false;
  newDepartment: string = '';
  selectedFaculty: any;

  constructor(
    private http: HttpClient,
    private addfacultyService: AddfacultyService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllFaculties();
    this.getAllDepartments();
  }

  save() {
    console.log('Entering save method');

    const addfacultyData = {
      FacultyName: this.facultyName,
      DepartmentName: this.departmentName.split(',').map(name => name.trim()),
    };

    console.log('Data to be sent:', addfacultyData);

    this.addfacultyService.addfaculty(addfacultyData)
      .subscribe(
        (response: any) => {
          console.log('Response:', response);

          if (response.status === true) {
            this.message = 'Faculty added successfully';
            this.getAllFaculties();
            this.addFacultyForm.resetForm(); // Reset the form

            // Display a message in the terminal/console
            console.log('Faculty added successfully');

            // Display a Snackbar message
            this.snackBar.open('Faculty added successfully', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar'], // You can define your CSS class for styling
            });

          } else {
            this.message = 'Failed to add Faculty: ' + response.message;
          }
        },
        (error) => {
          this.message = 'Error: ' + error.message;
          console.error('Error in save method:', error);
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
    this.http.get("http://localhost:8000/department/getAll")
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

              // Display a message in the terminal/console
              console.log('Departments updated successfully');
            } else {
              this.message = 'Failed to update Departments: ' + response.message;
              console.error('Failed to update Departments:', response);
            }
          },
          (error) => {
            this.message = 'Error: ' + error.message;
            console.error('Error updating departments:', error);
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
              console.error('Failed to add Department:', response);
            }
          },
          (error) => {
            this.message = 'Error: ' + error.message;
            console.error('Error adding department:', error);
          }
        );
      
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.dialogOpen = false;
    this.newDepartment = '';
    this.addFacultyForm.resetForm();
  }
}