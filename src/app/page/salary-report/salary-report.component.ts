// salary-report.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LecturerviewService } from 'src/app/lecturerview.service';
import { PdfGeneratorService } from 'src/app/pdf-generator.service';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css']
})
export class SalaryReportComponent {

  LecturerArray: any[] = [];
  ModuleData: any[] = [];
  selectedLecturer: any;

  constructor(private pdfGeneratorService: PdfGeneratorService,private http: HttpClient, private lecturerviewService: LecturerviewService) {}

  downloadSalaryReport(): void {
    this.pdfGeneratorService.generateSalaryReport();
  }
  
  ngOnInit() {
    console.log("Fetching lecturers...");
    this.getAllLecturers();

    console.log("Fetching modules...");
    this.getAllModules();
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
  }

  viewStatus(lecturer: any) {
    this.selectedLecturer = lecturer;
    this.lecturerviewService.setLecturer(this.selectedLecturer);
  }
}
