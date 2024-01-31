import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from 'src/app/batch.service';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit {
  Department: string = '';
  DegreeName: string = '';
  BatchNo: string = '';

  constructor(private route: ActivatedRoute, private batchService: BatchService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Department = params['Department'];
    });
  }

  save() {
    const batchData = {
      DegreeName: this.DegreeName,
      BatchNo: this.BatchNo,
      Department: this.Department
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
}
