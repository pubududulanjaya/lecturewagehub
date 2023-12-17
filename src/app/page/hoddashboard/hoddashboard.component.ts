import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LecturerviewService } from 'src/app/lecturerview.service';

@Component({
  selector: 'app-hoddashboard',
  templateUrl: './hoddashboard.component.html',
  styleUrls: ['./hoddashboard.component.css']
})
export class HoddashboardComponent implements OnInit {
  LecturerArray: any[] = [];
  ModuleData: any[] = [];
  selectedLecturer: any;

  constructor(private http: HttpClient, private lecturerviewService: LecturerviewService) {}

  ngOnInit() {
    console.log("Fetching lecturers...");
    this.getAllLecturers();

    console.log("Fetching modules...");
    this.getAllModules();

    // Add the action you want to perform after viewing all data
    this.performAfterViewingAllData();
  }

  getAllLecturers() {
    this.http.get("http://localhost:8000/lectureDetails/getAll")
      .subscribe((resultData: any) => {
        console.log("Lecturers data:", resultData);
        this.LecturerArray = resultData.data;
      });
  }

  getAllModules() {
    this.http.get("http://localhost:8000/module/getAll")
      .subscribe((resultData: any) => {
        console.log("Modules data:", resultData);
        this.ModuleData = resultData.data;
      });
  }

  getModuleName(LecturerName: string): string {
    console.log("Searching for module for lecturer:", LecturerName);
    const moduleMatch = this.ModuleData.find(module => module.LecturerName === LecturerName);
    console.log("Matched module:", moduleMatch);
    return moduleMatch ? moduleMatch.ModuleName : 'Not Found';
  }

  getHours(LecturerName: string): string {
    console.log("Searching for module for lecturer:", LecturerName);
    const moduleMatch = this.ModuleData.find(module => module.LecturerName === LecturerName);
    console.log("Matched module:", moduleMatch);
    return moduleMatch ? moduleMatch.Hours : 'Not Found';
  }

  approveLecturer(lecturer: any) {
    // Add your logic for approving a lecturer
    console.log('Lecturer Approved:', lecturer);

    // You can add logic here to send data to the admin panel
    // For example, you can make an HTTP request to the admin panel endpoint
    this.http.post('http://localhost:8000/admin/approveLecturer', lecturer)
      .subscribe(
        (response: any) => {
          console.log('Approval response:', response);
          // Handle the response as needed
        },
        (error: any) => {
          console.error('Error approving lecturer:', error);
          // Handle the error as needed
        }
      );
  }

  viewStatus(lecturer: any) {
    this.selectedLecturer = lecturer;
    this.lecturerviewService.setLecturer(this.selectedLecturer);
  }

  performAfterViewingAllData() {
    // Add your logic here
    console.log("Viewing all data is complete. Performing additional action.");
    // For example, you can trigger another function or display a message.
  }
}
