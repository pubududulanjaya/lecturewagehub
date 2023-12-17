import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LecturerviewService } from 'src/app/lecturerview.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  LecturerArray: any[] = [];
  selectedLecturer: any; // Variable to store the selected lecturer for viewing details

  constructor(private http: HttpClient, private lecturerviewService: LecturerviewService) {}

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

  editLecturer(lecturer: any) {
    // Add your logic for editing a lecturer
    console.log('Editing lecturer:', lecturer);
  }

  viewStatus(lecturer: any) {
    // Set the selected lecturer and open the modal
    this.selectedLecturer = lecturer;
    this.lecturerviewService.setLecturer(this.selectedLecturer); // You can use a service to share data between components
  }
}

