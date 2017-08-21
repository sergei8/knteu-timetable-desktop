import {Component} from '@angular/core';
import {
  WeekDayPara,
  weekNames,
  dayNamesList,
  paraNamberList
} from '../data.service';

@Component({
  selector: 'tt-auditoria-timetable',
  templateUrl: './auditoria-timetable.component.html'
})
export class AuditoriaTimetableComponent {

  private wdp: any;
  private weekNames;
  private dayNamesList;
  private paraNumberList;

  constructor() {
    this.wdp = $.extend(true, {}, WeekDayPara); // make copy of WeekDayPara
    this.weekNames = weekNames;
    this.dayNamesList = dayNamesList;
    this.paraNumberList = paraNamberList;
  }


}
