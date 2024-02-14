import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecregistrationService } from 'src/app/lecregistration.service';
import { FileUploader } from 'ng2-file-upload';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lecregistration',
  templateUrl: './lecregistration.component.html',
  styleUrls: ['./lecregistration.component.css']
})
export class LecregistrationComponent {
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

  Department: string = '';
  constructor(
    private lecregistrationService: LecregistrationService,
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
  }

  save() {
    // Increment the lecturer ID for the next profile
    this.lecturerId++;

    // Rest of your code for saving lecturer registration data
    const lecregistrationData = {
      lecturerId: this.lecturerId,
      LecturerName: this.LecturerName,
      Title: this.Title,
      MobileNumber: this.MobileNumber,
      NIC: this.NIC,
      AddressLine1: this.AddressLine1,
      AddressLine2: this.AddressLine2,
      State: this.State,
      Email: this.Email,
      SalaryType: this.SalaryType,
      MonthlyPayment: this.MonthlyPayment,
      RatePerHour: this.RatePerHour,
      AccountName: this.AccountName,
      AccountNumber: this.AccountNumber,
      BankName: this.BankName,
      bankCode: this.bankCode,
      BranchName: this.BranchName,
      BranchCode: this.BranchCode,

      Department: this.Department,
    };

    // Call the service to add lecturer registration
    this.lecregistrationService.addlecregistration(lecregistrationData)
      .subscribe((response: any) => {
        if (response.status === true) {
          alert('Lecturer added successfully');
        } else {
          alert('Failed to add Lecturer: ' + response.message);
        }
      });
  }
  // Function to handle bank selection change
  onBankSelectionChange() {
    // Implement logic to get the bank code based on the selected bank name
    switch (this.BankName) {
      case 'Alliance Finance Company PLC':
        this.bankCode = '7852';
        break;
      case 'Amana Bank PLC':
        this.bankCode = '7463';
        break;
      case 'Axis Bank':
        this.bankCode = '7472';
        break;
      case 'Bank of Ceylon':
        this.bankCode = '7010';
        break;
      case 'Cargills Bank Limited':
        this.bankCode = '7481';
        break;
      case 'Central Bank of Sri Lanka':
        this.bankCode = '8004';
        break;
      case 'Central Finance PLC':
        this.bankCode = '7825';
        break;
      case 'Citi Bank':
        this.bankCode = '7047';
        break;
      case 'Citizen Development Business Finance PLC':
        this.bankCode = '7746';
        break;
      case 'Commercial Bank PLC':
        this.bankCode = '7056';
        break;
      case 'Commercial Credit & Finance PLC':
        this.bankCode = '7870';
        break;
      case 'Commercial Leasing and Finance':
        this.bankCode = '7807';
        break;
      case 'Deutsche Bank':
        this.bankCode = '7205';
        break;
      case 'DFCC Bank PLC':
        this.bankCode = '7454';
        break;
      case 'Habib Bank Ltd':
        this.bankCode = '7074';
        break;
      case 'Hatton National Bank PLC':
        this.bankCode = '7083';
        break;
      case 'HDFC Bank':
        this.bankCode = '7737';
        break;
      case 'Hongkong Shanghai Bank':
        this.bankCode = '7092';
        break;
      case 'ICICI Bank Ltd':
        this.bankCode = '7384';
        break;
      case 'Indian Bank':
        this.bankCode = '7108';
        break;
      case 'Indian Overseas Bank':
        this.bankCode = '7117';
        break;
      case 'Kanrich Finance Limited':
        this.bankCode = '7834';
        break;
      case 'Lanka Orix Finance PLC':
        this.bankCode = '7861';
        break;
      case 'LB Finance PLC':
        this.bankCode = '7773';
        break;
      case 'MCB Bank Ltd':
        this.bankCode = '7269';
        break;
      case 'Mercantile Investment and Finance PLC':
        this.bankCode = '7913';
        break;
      case 'Merchant Bank of Sri Lanka & Finance PLC':
        this.bankCode = '7898';
        break;
      case 'National Development Bank PLC':
        this.bankCode = '7214';
        break;
      case 'National Savings Bank':
        this.bankCode = '7719';
        break;
      case 'Nations Trust Bank PLC':
        this.bankCode = '7162';
        break;
      case 'Pan Asia Banking Corporation PLC':
        this.bankCode = '7311';
        break;
      case 'Peoples Bank':
        this.bankCode = '7135';
        break;
      case 'People’s Leasing & Finance PLC':
        this.bankCode = '7922';
        break;
      case 'Public Bank':
        this.bankCode = '7296';
        break;
      case 'Regional Development Bank':
        this.bankCode = '7755';
        break;
      case 'Sampath Bank PLC':
        this.bankCode = '7278';
        break;
      case 'Sanasa Development Bank':
        this.bankCode = '7728';
        break;
      case 'Senkadagala Finance PLC':
        this.bankCode = '7782';
        break;
      case 'Seylan Bank PLC':
        this.bankCode = '7287';
        break;
      case 'Standard Chartered Bank':
        this.bankCode = '7038';
        break;
      case 'State Bank of India':
        this.bankCode = '7144';
        break;
      case 'State Mortgage & Investment Bank':
        this.bankCode = '7764';
        break;
      case 'Union Bank of Colombo PLC':
        this.bankCode = '7302';
        break;
      default:
        this.bankCode = '';
        break;
    }
  }
  
}