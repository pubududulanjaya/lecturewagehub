import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { LecturerService } from 'src/app/lecturer.service';
import Swal from 'sweetalert2';

interface lecturer {
  id: string;
  LecturerName: string;
  Title: string;
  MobileNumber: string;
  NIC: string;
  AddressLine1: string;
  AddressLine2: string;
  State: string;
  Email: string;
  SalaryType: string;
  MonthlyPayment: string;
  RatePerHour: string;
  AccountName: string;
  AccountNumber: string;
  BankName: string;
  bankCode: string;
  BranchName: string;
  BranchCode: string;
  // Request_State: string;
  Department: string;
}

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  lecturerDetails: any = {};
  LecturerArray: any[] = [];
  filteredItems: any[] = [];
  apiUrl = 'http://localhost:8000';
  LecturerName: string = ''; // Declaration and initialization of LecturerName
  Title: string = ''; // Declaration and initialization of Title

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  
  
    private cookieService: CookieService,
    private lecturerService: LecturerService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.LecturerName = params.get('LecturerName') || '';

      this.fetchLecturerDetails();

      
    });
    this.getAllLecturers();
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
    if (this.LecturerName.trim() !== '') {
      this.filteredItems = this.LecturerArray.filter((lecturer) =>
        lecturer.LecturerName === this.LecturerName
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

  fetchLecturerDetails(): void {
    this.lecturerService.getLecturerDetails(this.LecturerName).subscribe(
      (data: any) => {
        this.lecturerDetails = data;
      },
      (error: any) => {
        console.error('Error fetching lecturer details:', error);
      }
    );
  }

  
  
}
