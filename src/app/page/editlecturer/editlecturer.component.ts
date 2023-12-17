import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editlecturer',
  templateUrl: './editlecturer.component.html',
  styleUrls: ['./editlecturer.component.css']
})
export class EditlecturerComponent implements OnInit {
  lecturer: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.lecturer = history.state.lecturer;
  }
}
    