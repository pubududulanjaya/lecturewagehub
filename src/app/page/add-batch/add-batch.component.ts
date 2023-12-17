import { Component } from '@angular/core';
import { BatchService } from 'src/app/batch.service';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent {
  DegreeName: string = ''; // Initialize the properties
  BatchNo: string = '';
  
  constructor(private batchService: BatchService) {}

  save() {
    const batchData = {
     
      DegreeName: this.DegreeName, // Access the properties here
      BatchNo: this.BatchNo
    };

    
   this.batchService.addbatch(batchData)
      .subscribe((response: any) => {
        if (response.status === true) {
          alert('Batch added successfully'); // Show a simple alert
        } else {
          alert('Failed to add Batch: ' + response.message); // Show an alert with an error message
        }
      });
  }
}
