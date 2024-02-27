import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LecturerviewService } from 'src/app/lecturerview.service';
import { PdfGeneratorService } from 'src/app/pdf-generator.service';
import { OtherpaymentService } from 'src/app/otherpayment.service';
import Swal from 'sweetalert2';
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
  lectureWiseModules:any[]=[];
  filteredItems: any[] = [];
  public Request_State: string = '';

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
  getAllLecturers(): void {
    this.http.get<any>('http://localhost:8000/lectureDetails/getAll')
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.LecturerArray = resultData.data;
        this.filterLecturers(); // Call filterLecturers after data retrieval
      });
  }
  
  filterLecturers(): void {
    this.filteredItems = this.LecturerArray.filter((lecturer) =>
      lecturer.Request_State === 'accepted' // Filter only lecturers with Request_State as 'accepted'
    );
  
    if (this.filteredItems.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'NOT found',
        showConfirmButton: false
      });
    }

 
  }
  
  getAllModules() {
    this.http.get("http://localhost:8000/module/getAll")
      .subscribe((resultData: any) => {
        console.log("Modules data:", resultData);
        this.ModuleData = resultData.data;
      });
  }

  getModuleName(LecturerName: string): string {
    const moduleMatch:any[]= this.ModuleData.filter(module => module.LecturerName === LecturerName);
    // Concatenate module names for the lecturer
    const moduleNames = moduleMatch.map(item => item.ModuleName).join(', ');
  
    return moduleNames || 'Not Found';
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

