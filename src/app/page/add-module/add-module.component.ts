import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/module.service';
import { LecturerviewService } from 'src/app/lecturerview.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {
  LecturerArray: any[] = [];
  selectedLecturer: string = ''; // Update property name

  ModuleName: string = '';
  ModuleCode: string = '';
  Hours: string = '';

  constructor(
    private http: HttpClient,
    private lecturerviewService: LecturerviewService,
    private moduleService: ModuleService,
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

  save() {
    const moduleData = {
      ModuleName: this.ModuleName,
      ModuleCode: this.ModuleCode,
      LecturerName: this.selectedLecturer, // Update property name
      Hours: this.Hours
    };

    this.moduleService.addmodule(moduleData)
      .subscribe((response: any) => {
        if (response.status === true) {
          alert('Module added successfully');
        } else {
          alert('Failed to add Module: ' + response.message);
        }
      });
  }
}
