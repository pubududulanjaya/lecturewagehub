import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-codashboard',
  templateUrl: './codashboard.component.html',
  styleUrls: ['./codashboard.component.css']
})
export class CodashboardComponent implements OnInit {
  LecturerArray: any[] = [];
  selectedLecturer: any;
  searchInput: string = '';
  Department: string='';
  filteredItems: any[] =[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.Department = this.cookieService.get('Department');

    this.route.params.subscribe(params => {
      this.Department = params['Department'] || this.Department;
      this.getAllLecturers(); // Fetch lecturers for the current department
    });
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
