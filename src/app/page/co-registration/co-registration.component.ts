import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoordinatorService } from 'src/app/coordinator.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-co-registration',
  templateUrl: './co-registration.component.html',
  styleUrls: ['./co-registration.component.css']
})
export class CoRegistrationComponent implements OnInit {
  FacultyArray: any[] = [];
  selectedFaculty: string = '';
  selectedFacultyName: string = '';
  DepartmentNameArray: any[] = [];
  Co_Name: string = '';
  Faculty: string = '';
  Department: string = '';
  Email: string = '';
  UserName: string = '';
  Password: string = '';
  UserType: string = 'coordinator';

  // Add boolean flags for email and password validation
  emailTouched: boolean = false;
  passwordTouched: boolean = false;

  constructor(
    private coordinatorService: CoordinatorService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.getAllFaculties();
  }

  getAllFaculties() {
    this.http.get("http://localhost:8000/faculty/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.FacultyArray = resultData.data;
        this.selectedFacultyName = this.getSelectedFacultyName();
        this.initializeDepartments();
      });
  }

  onFacultyChange() {
    this.initializeDepartments();
  }

  initializeDepartments() {
    this.DepartmentNameArray = this.getDepartmentsForFaculty(this.selectedFaculty);
  }

  getDepartmentsForFaculty(faculty: string): string[] {
    const selectedFacultyObject = this.FacultyArray.find(f => f.FacultyName === faculty);
    return selectedFacultyObject ? selectedFacultyObject.DepartmentName : [];
  }

  save() {
    if (!this.validateEmail(this.Email)) {
      this.showSnackBar('Please enter a valid email address');
      return;
    }

    if (!this.validatePassword(this.Password)) {
      this.showSnackBar('Password must be at least 6 characters long');
      return;
    }

    const coordinatorData = {
      Co_Name: this.Co_Name,
      Faculty: this.selectedFaculty,
      Department: this.Department,
      Email: this.Email,
      UserName: this.UserName,
      Password: this.Password,
      UserType: this.UserType,
    };

    const loginData = {
      username: coordinatorData.UserName,
      password: coordinatorData.Password,
      usertype: coordinatorData.UserType,
      Department: coordinatorData.Department,
    };

    this.coordinatorService.addCoordinator(coordinatorData)
      .subscribe((response: any) => {
        if (response.status === true) {
          this.loginService.saveLogin(loginData).subscribe((loginResponse: any) => {
            if (loginResponse.success) {
              this.showSnackBar('Coordinator added successfully');
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
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private getSelectedFacultyName(): string {
    const selectedFacultyObject = this.FacultyArray.find(faculty => faculty.FacultyName === this.selectedFaculty);
    return selectedFacultyObject ? selectedFacultyObject.FacultyName : '';
  }
}
