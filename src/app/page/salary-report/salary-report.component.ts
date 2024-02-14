import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LecturerviewService } from 'src/app/lecturerview.service';
import { PdfGeneratorService } from 'src/app/pdf-generator.service';
import { OtherpaymentService } from 'src/app/otherpayment.service';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css']
})
export class SalaryReportComponent implements OnInit {

  LecturerArray: any[] = [];
  ModuleData: any[] = [];
  selectedLecturer: any;
  otherPayments: any[] = [];

  constructor(
    private pdfGeneratorService: PdfGeneratorService,
    private http: HttpClient,
    private lecturerviewService: LecturerviewService,
    private otherPaymentService: OtherpaymentService
  ) {}

  downloadSalaryReport(): void {
    this.pdfGeneratorService.generateSalaryReport();
  }

  ngOnInit() {
    console.log("Fetching lecturers...");
    this.getAllLecturers();

    console.log("Fetching modules...");
    this.getAllModules();

    this.otherPaymentService.getPayments(this.selectedLecturer.LecturerName).subscribe(
      (data: any) => {
        this.otherPayments = data;
      },
      (error) => {
        console.error('Error fetching other payments:', error);
      }
    );
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
    const moduleMatch = this.ModuleData.find(module => module.LecturerName === LecturerName);
    return moduleMatch ? moduleMatch.ModuleName : 'Not Found';
  }

  getPaymentDescription(lecturer: any): string {
    const paymentMatch = this.otherPayments.find(payment => payment.LecturerName === lecturer.LecturerName);
    return paymentMatch ? paymentMatch.Description : 'No description';
  }

  getHours(LecturerName: string): string {
    const moduleMatch = this.ModuleData.find(module => module.LecturerName === LecturerName);
    return moduleMatch ? moduleMatch.Hours : 'Not Found';
  }

  approveLecturer(lecturer: any) {
    console.log('Lecturer Approved:', lecturer);
  }

  viewStatus(lecturer: any) {
    this.selectedLecturer = lecturer;
    this.lecturerviewService.setLecturer(this.selectedLecturer);
  }
}
