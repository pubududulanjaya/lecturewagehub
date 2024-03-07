import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor() { }

  calculateSalaries(timetableArray: any[]): void {
    timetableArray.forEach((item) => {
      item.salary = (item.RatePerHour / 60) * item.timeInterval;
    });
  }

  calculateTotalHours(timetableArray: any[]): number {
    let totalHours = 0;
    timetableArray.forEach((item) => {
      
      totalHours += parseInt(item.timeInterval) ;
    });
    return totalHours;
  }

  // calculateTotalHoursSum(timetableArray: any[]): number {
  //   let totalHoursSum = 0;
  //   timetableArray.forEach((item) => {
  //     totalHoursSum += item.timeInterval;
  //   });
  //   return totalHoursSum;
  // }
  calculateTotalSalary(timetableArray: any[]): number {
    let totalSalary = 0;
    timetableArray.forEach((item) => {
      
      totalSalary += parseInt(item.salary) ;
    });
    return totalSalary;
  }

  calculateTotalSalarywithop(timetableArray: any[], otherPayments: any[]): number {
    let totalSalary = this.calculateTotalSalary(timetableArray); // Calculate total salary from timetable
    let totalOtherPayments = 0;
  
    // Calculate total amount from other payments
    for (let payment of otherPayments) {
      totalOtherPayments += payment.amount || 0;
    }
  
    // Sum up total salary and total other payments
    let totalSalarywithop = totalSalary + totalOtherPayments;
  
    return totalSalarywithop;
  }
  
}
