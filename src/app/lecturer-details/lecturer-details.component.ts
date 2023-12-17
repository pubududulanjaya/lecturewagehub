import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-lecturer-details',
  templateUrl: './lecturer-details.component.html',
  styleUrls: ['./lecturer-details.component.css']
})
export class LecturerDetailsComponent implements OnInit{
  lecturer: any; // Assume that you receive the lecturer data as an input


  lecturerId: number = 1; // Initialize it based on your requirements
  LecturerName: string = '';
  Title: string = '';
  MobileNumber: string = '';
  NIC: string = '';
  AddressLine1: string = '';
  AddressLine2: string = '';
  State: string = '';
  Email: string = '';
  SalaryType: string = '';
  MonthlyPayment: string = '';
  RatePerHour: string = '';
  AccountName: string = '';
  AccountNumber: string = '';
  BankName: string = '';
  bankCode: string = '';
  BranchName: string = '';
  BranchCode: string = '';
  constructor() { }

  ngOnInit(): void {
    // You need to set the lecturer data from your API response or wherever you get it
    this.lecturer = {
      "_id": { "$oid": "656439fa8d926d4dc5bf06f9" },
      "LecturerName": this.LecturerName,
      "Title": "Prof.",
      "MobileNumber": this.MobileNumber,
      "NIC": "20000135268",
      "AddressLine1": "Malabe, Kaduwela",
      "AddressLine 2": "Malabe",
      "State": "malabe",
      "Email": "pubududulla@gmail.com",
      "SalaryType": "Monthly payment",
      "MonthlyPayment": "1784",
      "AccountName": "pubuduajdabkjd",
      "AccountNumber": "000000087",
      "BankName": "Hatton National Bank PLC",
      "bankCode": "7083",
      "BranchName": "malabe",
      "BranchCode": "12345",
      "__v": 0
    };
  }
}