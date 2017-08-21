import {Component, OnInit} from '@angular/core';
import {
  WeekDayPara,
  weekNames,
  dayNamesList,
  paraNamberList,
  DataService
} from '../data.service';

@Component({
  selector: 'tt-auditoria-timetable',
  templateUrl: './auditoria-timetable.component.html'
})
export class AuditoriaTimetableComponent implements OnInit {

  private wdp: any;
  private weekNames;
  private dayNamesList;
  private paraNumberList;

  constructor(private dataService: DataService) {
    this.wdp = $.extend(true, {}, WeekDayPara); // make copy of WeekDayPara
    this.weekNames = weekNames;
    this.dayNamesList = dayNamesList;
    this.paraNumberList = paraNamberList;
  }

  ngOnInit() {
  }


}
