import {Component, OnInit} from '@angular/core';
import {globalSwitches} from '../../data.service';

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
    globalSwitches.auditoriaButtonClicked = true; // turn on `if` for timetable
    globalSwitches.studentButtonClicked = globalSwitches.teacherButtonClicked = false;

  }

}
