import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimetableService } from 'src/app/timetable.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  LecturerArray: any[] = [];
  selectedLecturer: string = '';
  ModuleArray: any[] = [];
  selectedModule: string = '';
  start_time:string='';
  end_time: string = '';
  day: string = '';
  selectedDate: Date = new Date(); // Initialize with a default Date
  timetableArray: any[] = [];
  message: string = '';
  Department: string = '';
  filteredItems: any[] =[];
  timeInterval: string = '';
  selectedLecturerRate: number | undefined;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private timetableService: TimetableService,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
     // Set the Department based on the cookie value
     this.Department = this.cookieService.get('Department');

     // Subscribe to route parameters and update Department if provided
     this.route.params.subscribe(params => {
       this.Department = params['Department'] || this.Department;
     });
    this.getTimetableData();
  }
  

updateRatePerHour(): void {
  const selectedLecturerObject = this.filteredItems.find(lecturer => lecturer.LecturerName === this.selectedLecturer);
  this.selectedLecturerRate = selectedLecturerObject ? selectedLecturerObject.RatePerHour : undefined;
}

  calculateTimeInterval(): void {
    if (this.start_time && this.end_time) {
      // Parse start and end times
      const startTime = new Date(`2000-01-01T${this.start_time}`);
      const endTime = new Date(`2000-01-01T${this.end_time}`);
      
      // Calculate time difference in milliseconds
      const diff = endTime.getTime() - startTime.getTime();
      
      // Convert milliseconds to minutes
      const minutes = Math.floor(diff / (1000 * 60));
  
      // Set the time interval
      this.timeInterval = `${minutes} `;
    } else {
      this.timeInterval = '';
    }
  }

  save(): void {

    this.calculateTimeInterval();
    // Extracting date without time
    const dateWithoutTime = this.selectedDate.toISOString().split('T')[0];

    const newEntry = {
      day: this.getDayType(this.selectedDate.toString()),
      date: dateWithoutTime,
      start_time: this.start_time,
      end_time:this.end_time,
      timeInterval:this.timeInterval,
      LecturerName:this.selectedLecturer,
      module: this.selectedModule,
      Department: this.Department,
      RatePerHour:this.selectedLecturerRate,
    };

    this.timetableService.timetable(newEntry).subscribe(
      (response: any) => {
        console.log("Timetable entry saved successfully:", response);
        // Optionally, update your local timetableArray with the response data
        this.timetableArray.push(response.data);
        this.showMessage('Timetable added successfully', 'success-snackbar');
      },
      (error: any) => {
        console.error("Error saving timetable entry:", error);
        this.showMessage('Error saving timetable entry', 'error-snackbar');
      }
    );
  }

  getTimetableData(): void {
    this.timetableService.getAllTimetableEntries().subscribe(
      (resultData: any) => {
        console.log("Timetable data:", resultData);
        this.timetableArray = resultData.data;
      },
      (error: any) => {
        console.error("Error fetching timetable data:", error);
        this.showMessage('Error fetching timetable data', 'error-snackbar');
      }
    );


    this.http.get(`http://localhost:8000/lectureDetails/getAll?Department=${this.Department}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.LecturerArray = resultData.data;
        this.filteredItems=this.LecturerArray.filter(item => item.Department === this.Department );
      });

   

    this.http.get("http://localhost:8000/module/getAll")
      .subscribe((resultData: any) => {
        console.log("Module data:", resultData);
        this.ModuleArray = resultData.data;
      });
  }

  edit(entry: any): void {
    // Implement edit functionality here
  }

  delete(entry: any): void {
    // Implement delete functionality here
  }

  showMessage(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }

  getDayType(date: string): string {
    const dayOfWeek = new Date(date).getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[dayOfWeek];
  }
}