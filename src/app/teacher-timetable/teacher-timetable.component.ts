import {Component, OnInit, OnDestroy} from '@angular/core';

import {
  studentFormResponse,
  teacherFormResponse,
  WeekDayPara,
  weekNames,
  dayNamesList,
  paraNamberList,
  menuItemNames,
  sharedData,
  DataService
} from '../data.service';

import * as _ from 'lodash';

@Component({
  selector: 'tt-teacher-timetable',
  templateUrl: './teacher-timetable.component.html'
})

export class TeacherTimetableComponent implements OnInit, OnDestroy {

  private selectedItems = teacherFormResponse;  // from teacher menu
  private studentButtonClicked = false;


  private wdp: any;
  // private table: string = '';
  private weekNames = weekNames;
  private dayNamesList = dayNamesList;
  private paraNumberList = paraNamberList;

  constructor(private dataService: DataService) {
    // pass  timeTable and fill appropriate `wdp` cells
    // based on `selectedItems` criteria
    this.wdp = $.extend(true, {}, WeekDayPara);

    let teacherTimeTable = dataService.timeTable[this.selectedItems.teacherName];

    _.each(teacherTimeTable, (week, weekName) =>
      _.each(week, (day, dayName) =>
        _.each(day, (para, paraNumber) => {
            if (this.selectedItems.discipline.trim() === para[3].trim().replace(/ +/g, ' ')
              || this.selectedItems.discipline === '') {
              // build array to fill the appropriated `paraNumber` cell
              this.wdp[weekName][dayName][paraNumber] = [].concat(para[5], para[3], para[4], para[0], para[1], para[2]);
            }
          }
        )
      )
    );

  }

  /*
   buildTable(): string {

   this.table = '';
   this.table = '<table class="table table-bordered table-striped" ><tbody>';
   for (let w in weekNames) {
   this.table += '<tr><td rowspan="2" class="para" >Пара</td> ' +
   '<td class="week" colspan="6"  >' + weekNames[w] + '</tr>';
   this.table += '<tr><td class="day">' + dayNamesList[0] + '</td>' +
   '<td class="day">' + dayNamesList[1] + '</td>' +
   '<td class="day">' + dayNamesList[2] + '</td>' +
   '<td class="day">' + dayNamesList[3] + '</td>' +
   '<td class="day">' + dayNamesList[4] + '</td>' +
   '<td class="day">' + dayNamesList[5] + '</td> </tr>';
   for (let p = 1; p <= 7; p++) {
   this.table += '<tr >';
   this.table += '<td  class="para">' + p + '</td>';
   for (let d in dayNamesList) {
   try {
   if (this.wdp[weekNames[w]][dayNamesList[d]][p][2] === undefined) {
   this.table += '<td>&nbsp;</td>';
   }

   else {
   this.table += '<td class="info"> <b>' + this.wdp[weekNames[w]][dayNamesList[d]][p][0] + ' </b>';
   this.table += this.wdp[weekNames[w]][dayNamesList[d]][p][1] + '<br /><b>';
   this.table += this.wdp[weekNames[w]][dayNamesList[d]][p][2] + ' </b>';
   this.table += this.wdp[weekNames[w]][dayNamesList[d]][p][3] + ' ';
   this.table += this.wdp[weekNames[w]][dayNamesList[d]][p][4] + '/';
   this.table += this.wdp[weekNames[w]][dayNamesList[d]][p][5];
   this.table += '</td>';
   }
   }
   catch (e) {
   this.table += '<td>розклад невідформатовано';
   }
   finally {
   this.table += '</td>';
   }
   }
   this.table += '</tr>'
   }
   }
   this.table += '</tbody></table>';

   // перейти на начало таблицы
   const element = document.querySelector('#buttonsPanel');
   if (element) {
   element.scrollIntoView();
   }

   return this.table;
   }
   */

  ngOnInit() {
  }

  ngOnDestroy() {
    this.wdp = WeekDayPara;   //reset wdp to clean (in WeekDayPara)
  }

  /* return content for week-day-para cell */
  getCell(week, day, para, item = 0) {

    try {
      return this.wdp[this.weekNames[week]][this.dayNamesList[day]]
        [this.paraNumberList[para]][item];
    }
    catch (e) {
      return 'розклад не відформатовано';
    }
  }

  // перейти на начало таблицы
  goTop() {
    const element = document.querySelector('#buttonsPanel');
    if (element) {
      element.scrollIntoView();
    }
  }

  goToTeacherTable(facName, courseNumber, groupNumber) {
    studentFormResponse.facName = facName;
    studentFormResponse.courseNumber = courseNumber;
    studentFormResponse.groupNumber = groupNumber;
    sharedData.teacherButtonClicked = false;
    this.studentButtonClicked = sharedData.studentButtonClicked = true;
  }

}
