import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BatchService } from 'src/app/batch.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit {
  Department: string = '';
  DegreeName: string = '';
  BatchNo: string = '';

  constructor(private route: ActivatedRoute, private router: Router,private batchService: BatchService,private cookieService: CookieService ) {}

  ngOnInit(): void {
    this.Department = this.cookieService.get('Department');

    this.route.params.subscribe(params => {
      this.Department = params['Department'] || this.Department;
    });
  }

  save() {
    const batchData = {
      DegreeName: this.DegreeName,
      BatchNo: this.BatchNo,
      Department: this.Department,
    };

    this.batchService.addBatch(batchData)
      .subscribe((response: any) => {
        if (response.status === true) {
          alert('Batch added successfully');
        } else {
          alert('Failed to add Batch: ' + response.message);
        }
      });
  }
  logout() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logged out successfully',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      // Clear cookies and navigate to the login page
      this.cookieService.delete('Department');
      this.router.navigate(['/login']); // Replace '/login' with the path to your login page
    });
  }
  
}
