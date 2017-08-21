import {Component, OnInit} from '@angular/core';
import {sharedData} from '../../data.service';

@Component({
  selector: 'tt-auditoriabutton',
  templateUrl: './auditoriabutton.component.html'
})
export class AuditoriabuttonComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  showAuditoriaTable() {
    sharedData.auditoriaButtonClicked = true; // turn on `if` for timetable
    sharedData.roomClicked = sharedData.studentButtonClicked = sharedData.teacherButtonClicked = false;

  }

}
