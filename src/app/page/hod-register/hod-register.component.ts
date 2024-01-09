import { Component } from '@angular/core';
import { HodService } from 'src/app/hod.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import {LoginService} from 'src/app/login.service';

@Component({
  selector: 'app-hod-register',
  templateUrl: './hod-register.component.html',
  styleUrls: ['./hod-register.component.css']
})
export class HodRegisterComponent {
  FacultyArray: any[] = [];
  selectedFaculty: string = '';
  selectedFacultyName: string = '';
  DepartmentNameArray: any[] = []; // Add an array to store departments

  HodName: string = ''; // Initialize the properties
  Faculty: string = '';
  Department: string = '';
  Email: string = '';
  UserName: string = '';
  Password: string = '';
  UserType:string='hod';

   // Add boolean flags for email and password validation
   emailTouched: boolean = false;
   passwordTouched: boolean = false;

  constructor(private hodService: HodService,private snackBar: MatSnackBar, private http: HttpClient,private loginService: LoginService) {}

  ngOnInit() {
    this.getAllFaculties();
  }

  getAllFaculties() {
    this.http.get("http://localhost:8000/faculty/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.FacultyArray = resultData.data;
        this.selectedFacultyName = this.getSelectedFacultyName();
        this.initializeDepartments(); // Initialize departments when faculties are loaded
      });
  }
  onFacultyChange() {
    this.initializeDepartments();
  }

  initializeDepartments() {
    // Get departments based on the selected faculty
    this.DepartmentNameArray = this.getDepartmentsForFaculty(this.selectedFaculty);
  }
  getDepartmentsForFaculty(faculty: string): string[] {
    const selectedFacultyObject = this.FacultyArray.find(f => f.FacultyName === faculty);
    return selectedFacultyObject ? selectedFacultyObject.DepartmentName : [];
  }
  // Define a function to save the hod data
  save() {
    if (!this.validateEmail(this.Email)) {
      this.showSnackBar('Please enter a valid email address');
      return;
    }

    if (!this.validatePassword(this.Password)) {
      this.showSnackBar('Password must be at least 6 characters long');
      return;
    }

    const hodData = {
     
      HodName: this.HodName, 
      Faculty: this.selectedFaculty, // Access the properties here
      Department: this.Department,
      Email: this.Email,
      UserName: this.UserName,
      Password: this.Password,
      UserType:this.UserType
    };

    const loginData = {
      username: hodData.UserName,
      password: hodData.Password,
      usertype: hodData.UserType,
      Department:hodData.Department,
    };

    
   this.hodService.addhod(hodData)
      .subscribe((response: any) => {
        if (response.status === true) {
          this.loginService.saveLogin(loginData).subscribe((loginResponse: any) => {
            if (loginResponse.success) {
              this.showSnackBar('HOD added successfully');
            } else {
              this.showSnackBar('Failed to save login information: ' + loginResponse.message);
            }
          });
        } else {
          this.showSnackBar('Failed to add coordinator: ' + response.message);
        }
      });
  }
  
  // Change access modifier to public
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Change access modifier to public
  validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private getSelectedFacultyName(): string {
    const selectedFacultyObject = this.FacultyArray.find(faculty => faculty.FacultyName === this.selectedFaculty);
    return selectedFacultyObject ? selectedFacultyObject.FacultyName : '';
  }
}