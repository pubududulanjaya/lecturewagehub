  import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './home/home.component';

import { CoRegistrationComponent } from './page/co-registration/co-registration.component';
import { CodashboardComponent } from './page/codashboard/codashboard.component';
import { LecregistrationComponent } from './page/lecregistration/lecregistration.component';
import { LecprofileComponent } from './page/lecprofile/lecprofile.component';
import { EditlecturerComponent } from './page/editlecturer/editlecturer.component';
import { HoddashboardComponent } from './page/hoddashboard/hoddashboard.component';
import { AddModuleComponent } from './page/add-module/add-module.component';
import { AddBatchComponent } from './page/add-batch/add-batch.component';
import { DepartmentDetailComponent } from './page/department-detail/department-detail.component';
import { HodRegisterComponent } from './page/hod-register/hod-register.component';
import { AdmindashboardComponent } from './page/admindashboard/admindashboard.component';
import { SalaryReportComponent } from './page/salary-report/salary-report.component';
import { SalaryCertificateComponent } from './page/salary-certificate/salary-certificate.component';
import { OtherPaymentComponent } from './page/other-payment/other-payment.component';
import { RateHistoryComponent } from './page/rate-history/rate-history.component';

import { AddfacultyComponent } from './page/addfaculty/addfaculty.component';

import { LecturerDetailsComponent } from './lecturer-details/lecturer-details.component';
import { TimetableComponent } from './page/timetable/timetable.component';
import { ViewProfileComponent } from './page/view-profile/view-profile.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path :'login',component:LoginComponent},
 
  {path:'co-registration',component:CoRegistrationComponent},
  {path:'codashboard',component:CodashboardComponent},
  {path:'lecregister',component:LecregistrationComponent},
  {path:'lecprofile/:LecturerName',component:LecprofileComponent},
  {path:'editlecturer/:LecturerName',component:EditlecturerComponent},
  {path:'HOD-panel',component:HoddashboardComponent},
  {path:'add_modul',component:AddModuleComponent},
  {path:'add_batch',component:AddBatchComponent},
  {path:'department_detail',component:DepartmentDetailComponent},
  {path:'hod-register',component:HodRegisterComponent},
  {path:'admin_dashboard',component:AdmindashboardComponent},
  {path:'salary_report',component:SalaryReportComponent},
  {path:'salary_Certificate/:LecturerName',component:SalaryCertificateComponent},
  {path:'add_other_payment',component:OtherPaymentComponent},
  {path:'rate-history',component:RateHistoryComponent},

  {path:'addfaculty',component:AddfacultyComponent},
  {path:'timetable',component:TimetableComponent},
  {path:'view_profile/:LecturerName',component:ViewProfileComponent},
  
  { path: 'lecturer/:LecturerName', component: LecturerDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
