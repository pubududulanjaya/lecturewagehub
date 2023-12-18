import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lecprofile',
  templateUrl: './lecprofile.component.html',
  styleUrls: ['./lecprofile.component.css']
})
export class LecprofileComponent implements OnInit {
  LecturerName!: string;
  Title!:string;
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Use square brackets to access the property
    this.LecturerName = this.route.snapshot.params['LecturerName'];
    this.Title = this.route.snapshot.params['Title'];
  }
}
