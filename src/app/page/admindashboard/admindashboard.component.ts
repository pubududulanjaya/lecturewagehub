import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LecturerviewService } from 'src/app/lecturerview.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




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
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  LecturerArray: any[] = [];
  DepartmentNameArray:any[]=[];
  DepartmentName:string=';'
  selectedLecturer: any; 
  searchInput: string = '';
  filteredItems: any[] = [];
  public Request_State: string = '';

  constructor(private http: HttpClient, private lecturerviewService: LecturerviewService,private router: Router) {}

  ngOnInit() {
    this.getAllLecturers();
    this.getAllDepartments();
  }

  getAllLecturers(): void {
    this.http.get<any>('http://localhost:8000/lectureDetails/getAll')
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.LecturerArray = resultData.data;
        this.filterLecturers();
      });
  }
  filterLecturers(): void {
    if (this.Request_State.trim() !== '') {
      this.filteredItems = this.LecturerArray.filter((lecturer) =>
        lecturer.Request_State === this.Request_State
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
  
  getAllDepartments(): void {
    this.http.get<any>('http://localhost:8000/faculty/getAll')
      .subscribe((resultData: any) => {
        this.DepartmentNameArray = resultData.data;
      });
  }

  filterLecturersByDepartment(): void {
    if (this.DepartmentName.trim() !== '') {
      this.filteredItems = this.LecturerArray.filter(lecturer => lecturer.Department === this.DepartmentName);
    } else {
      this.filteredItems = this.LecturerArray; // If no department selected, show all lecturers
    }
  }


  

  editLecturer(lecturer: any) {
    // Add your logic for editing a lecturer
    console.log('Editing lecturer:', lecturer);
  }

  viewStatus(lecturer: any) {
    // Set the selected lecturer and open the modal
    this.selectedLecturer = lecturer;
    this.lecturerviewService.setLecturer(this.selectedLecturer); // You can use a service to share data between components
  }

  searchLecturers() {
    if (this.searchInput.trim() !== '') {
      this.LecturerArray = this.LecturerArray.filter((lecturer) =>
        lecturer.LecturerName.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    } else {
      this.getAllLecturers();
    }
  }

  handleInputChange(event: any) {
    this.searchInput = event.target.value;
    this.searchLecturers();
  }

  updateState(data: any): void {
    const updatedlecturer: lecturer = { ...data, Request_State: 'accepted' };
    
    this.http.patch(`http://localhost:8000/lectureDetails/update/${data.id}`, updatedlecturer)
      .subscribe(
        (response) => {
          console.log(response);
          alert('Report State updated to admin pending');
         
          this.getAllLecturers(); 
        },
        (error) => {
          console.error('Error updating report State:', error);
        }
      );
  }

}