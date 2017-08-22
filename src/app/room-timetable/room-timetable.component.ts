import {Component} from '@angular/core';
import {
  teacherFormResponse,
  WeekDayPara,
  weekNames,
  dayNamesList,
  paraNamberList,
  DataService,
  sharedData
} from '../data.service';

import * as _ from 'lodash';

@Component({
  selector: 'tt-room-timetable',
  templateUrl: './room-timetable.component.html'
})
export class RoomTimetableComponent {

  roomNumber = sharedData.selectedRoom;
  showTeacher:boolean = false;

  private wdp: any;
  weekNames = weekNames;
  dayNamesList = dayNamesList;
  paraNumberList = paraNamberList;

  constructor(private dataService: DataService) {
    this.wdp = $.extend(true, {}, WeekDayPara);

    // pass  timeTable and fill appropriate `wdp` cells
    // based on `selectedItems` criteria
    _.each(dataService.timeTable, (fio, teacherName) =>
      _.each(fio, (week, weekName) =>
        _.each(week, (day, dayName) =>
          _.each(day, (para, paraNumber) => {
              if (this.roomNumber === para[4]) {
                this.wdp[weekName][dayName][paraNumber] = [].concat(para[5], para[3],
                  teacherName, para[0], para[1], para[2]);
              }
            }
          )
        )
      )
    );
  }

  /* return content for week-day-para cell */
  getCell(week, day, para, item = 0) {
    console.log(this.wdp[this.weekNames[week]][this.dayNamesList[day]]
      [this.paraNumberList[para]]);
    try {
      return this.wdp[this.weekNames[week]][this.dayNamesList[day]]
        [this.paraNumberList[para]][item];
    }
    catch (e) {
      return 'розклад не відформатовано';
    }
  }

  goToTeacherTable(teacherName) {
    //console.log(teacherName);
    teacherFormResponse.teacherName = teacherName;
    //console.log(teacherFormResponse);
    sharedData.roomClicked = sharedData.auditoriaButtonClicked = sharedData.studentButtonClicked = false;
    this.showTeacher = sharedData.teacherButtonClicked = true;
  }

  // перейти на начало таблицы
  goTop() {
    let element = document.querySelector('#buttonsPanel');
    if (element) {
      element.scrollIntoView();
    }

  }


}
