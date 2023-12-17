import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './home/home.component';

import { CoRegistrationComponent } from './page/co-registration/co-registration.component';
import { CodashboardComponent } from './page/codashboard/codashboard.component';
import { LecregistrationComponent } from './page/lecregistration/lecregistration.component';
import { LecprofileComponent } from './page/lecprofile/lecprofile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { EditlecturerComponent } from './page/editlecturer/editlecturer.component';
import { HoddashboardComponent } from './page/hoddashboard/hoddashboard.component';
import { AddModuleComponent } from './page/add-module/add-module.component';
import { AddBatchComponent } from './page/add-batch/add-batch.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { DepartmentDetailComponent } from './page/department-detail/department-detail.component';

import { HodRegisterComponent } from './page/hod-register/hod-register.component';
import { FileUploadModule } from 'ng2-file-upload';


import { AdmindashboardComponent } from './page/admindashboard/admindashboard.component';
import { SalaryReportComponent } from './page/salary-report/salary-report.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalaryCertificateComponent } from './page/salary-certificate/salary-certificate.component';
import { OtherPaymentComponent } from './page/other-payment/other-payment.component';
import { RateHistoryComponent } from './page/rate-history/rate-history.component';



import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AddfacultyComponent } from './page/addfaculty/addfaculty.component';
import { LecturerDetailsComponent } from './lecturer-details/lecturer-details.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
   
    CoRegistrationComponent,
    CodashboardComponent,
    LecregistrationComponent,
    LecprofileComponent,
    FooterComponent,
    EditlecturerComponent,
    EditlecturerComponent,
    HoddashboardComponent,
    AddModuleComponent,
    AddBatchComponent,
    DepartmentDetailComponent,
    HodRegisterComponent,
    AdmindashboardComponent,
    SalaryReportComponent,
    SalaryCertificateComponent,
    OtherPaymentComponent,
    RateHistoryComponent,

    AddfacultyComponent,
     LecturerDetailsComponent,
    
  
  


  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,


    MatSnackBarModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
