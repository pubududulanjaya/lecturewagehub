// codashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LecturerviewService } from 'src/app/lecturerview.service';
import { LecturerService } from 'src/app/lecturer.service';

@Component({
  selector: 'app-codashboard',
  templateUrl: './codashboard.component.html',
  styleUrls: ['./codashboard.component.css']
})
export class CodashboardComponent implements OnInit {
  LecturerArray: any[] = [];
  selectedLecturer: any;
  searchInput: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private lecturerviewService: LecturerviewService,
    private lecturerService: LecturerService
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

  editLecturer(lecturer: any) {
    this.lecturerService.getLecturerDetails(lecturer.LecturerName.toString()).subscribe(
      (data) => {
        this.router.navigate(['/editlecturer', lecturer.LecturerName], { state: { lecturer: data } });
      },
      (error) => {
        console.error('Error fetching lecturer details:', error);
      }
    );
  }

  viewStatus(lecturer: any) {
    this.selectedLecturer = lecturer;
    this.lecturerviewService.setLecturer(this.selectedLecturer);
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
}
