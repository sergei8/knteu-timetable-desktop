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

  selectedItems = teacherFormResponse;  // from teacher menu
  studentButtonClicked = false;


  private wdp: any;
  weekNames = weekNames;
  dayNamesList = dayNamesList;
  paraNumberList = paraNamberList;

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


  ngOnInit() {
  }

  ngOnDestroy() {
    this.wdp = WeekDayPara;   //reset wdp to clean (in WeekDayPara)
  }

  /* return content for week-day-para cell */
  getCell(week, day, para, item = 0) {

    try {
      // если в пар - список (лекция), берем первую
      if (item === 5) {
        console.log(this.wdp[this.weekNames[week]][this.dayNamesList[day]]
          [this.paraNumberList[para]][item]);
        return this.wdp[this.weekNames[week]][this.dayNamesList[day]]
          [this.paraNumberList[para]][item].split(',')[0];

      } else {
        return this.wdp[this.weekNames[week]][this.dayNamesList[day]]
          [this.paraNumberList[para]][item];
      }
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
