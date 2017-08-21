import {Component} from '@angular/core';

import {
  studentFormResponse,
  teacherFormResponse,
  WeekDayPara,
  weekNames,
  dayNamesList,
  paraNamberList,
  menuItemNames,
  DataService,
  globalSwitches
} from '../data.service';

import * as _ from 'lodash';

@Component({
  selector: 'tt-student-timetable',
  templateUrl: './student-timetable.component.html'
})
export class StudentTimetableComponent  {

  private selectedItems = studentFormResponse;  // from student menu
  private teacherButtonClicked = false;

  private wdp: any;
  private weekNames = weekNames;
  private dayNamesList = dayNamesList;
  private paraNumberList = paraNamberList;

  constructor(private dataService: DataService) {
    this.wdp = $.extend(true, {}, WeekDayPara);

    // pass  timeTable and fill appropriate `wdp` cells
    // based on `selectedItems` criteria
    _.each(dataService.timeTable, (fio, teacherName) =>
      _.each(fio, (week, weekName) =>
        _.each(week, (day, dayName) =>
          _.each(day, (para, paraNumber) => {
              if (this.selectedItems.facName === para[0]
                && this.selectedItems.courseNumber === para[1]
                && this.selectedItems.groupNumber === para[2]) {
                // apply filters
                if (this.selectedItems.discipline.trim() === para[3].trim().replace(/ +/g, ' ')
                  || this.selectedItems.teacher === teacherName
                  || (this.selectedItems.discipline === '' && this.selectedItems.teacher === '')) {
                  // build array to fill the appropriated `paraNumber` cell
                  this.wdp[weekName][dayName][paraNumber] = [].concat(para[5], para[3], para[4], teacherName);
                }
              }
            }
          )
        )
      )
    );
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

  goToTeacherTable(teacherName) {
    console.log(teacherName);
    teacherFormResponse.teacherName = teacherName;
    console.log(teacherFormResponse);
    globalSwitches.studentButtonClicked = false;
    this.teacherButtonClicked = globalSwitches.teacherButtonClicked = true;
  }

  // перейти на начало таблицы
  goTop() {
    const element = document.querySelector('#buttonsPanel');
    if (element) {
      element.scrollIntoView();
    }

  }
}

