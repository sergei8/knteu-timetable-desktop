// service for deliver time-table data and build working sets
// import { timeTable } from './timetable';
// import data = require('./timetable');
// -------------------- полезный мусор ---------------------
import * as _ from 'lodash';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  public timeTable = {};

  // получить данные из файла
  getTimeTable() {
    // return this.http.get('assets/db/time-table.json')
    return this.http.get('https://sergei8.github.io/TT-site/assets/db/time-table.json')
      .map(response => response.json());
  }

  // extract faculties names from prepodsList
  // based on value of `selectedLearningForm`
  // and return appropriate faculties names list
  // for the fac. name menu
  //todo померять времф выполнеия map и простой for
  getFacNameList() {

    let facNameList: string[] = [];

    _.each(this.timeTable, (fio) =>
      _.each(fio, (week) =>
        _.each(week, (day) =>
          _.each(day, (para) => {
              if (!(_.includes(facNameList, para[0]))) {
                facNameList.push(para[0]);    // build faculties menu
              }
            }
          )
        )
      )
    );
    return facNameList.sort();
  }

  // extract courses from prepodsList
  getCourseList() {

    // let courseNamberList: string[] = [];
    let courseNamberList: any[] = [];

    for (var fio in this.timeTable) {
      for (var week in this.timeTable[fio]) {
        for (var day in this.timeTable[fio][week]) {
          for (var para in this.timeTable[fio][week][day]) {
            let facName = _.values(this.timeTable[fio][week][day][para])[0];
            let courseNumber = _.values(this.timeTable[fio][week][day][para])[1];
            if ((facName == studentFormResponse.facName) && !(_.includes(courseNamberList, courseNumber))) {
              courseNamberList.push(courseNumber);
            }
          }
        }
      }
    }
    return courseNamberList.sort();
  }

  // extract groups from prepodsList
  getGroupList() {

    let groupNumberList = [];

    for (let fio in this.timeTable) {
      for (let week in this.timeTable[fio]) {
        for (let day in this.timeTable[fio][week]) {
          for (let para in this.timeTable[fio][week][day]) {
            let facName = _.values(this.timeTable[fio][week][day][para])[0];
            let courseNumber = _.values(this.timeTable[fio][week][day][para])[1];
            let groupNumber = this.extractGroupNumber( _.values(this.timeTable[fio][week][day][para])[2]);
            // push fac. group i number into array if it is not present yet
            if ((facName == studentFormResponse.facName)
              && (courseNumber == studentFormResponse.courseNumber)
              && !(_.includes(groupNumberList, groupNumber))) {
              groupNumberList.push(groupNumber);
            }
          }
        }
      }
    }
    return groupNumberList.sort();

  }

  getDiscilpileList() {

    let disciplineList = [];
    // let disciplineList: string[] = [];

    for (var fio in this.timeTable) {
      for (var week in this.timeTable[fio]) {
        for (var day in this.timeTable[fio][week]) {
          for (var para in this.timeTable[fio][week][day]) {
            let facName = _.values(this.timeTable[fio][week][day][para])[0];
            let courseNumber = _.values(this.timeTable[fio][week][day][para])[1];
            let groupNumber = _.values(this.timeTable[fio][week][day][para])[2];
            let discipline = _.values(this.timeTable[fio][week][day][para])[3];
            if ((facName == studentFormResponse.facName)
              && (courseNumber == studentFormResponse.courseNumber)
              && (groupNumber == studentFormResponse.groupNumber)
              && (!(_.includes(disciplineList, discipline)))) {
              disciplineList.push(discipline);
            }
          }
        }
      }
    }
    return disciplineList.sort();
  }

  // выбрать преподавателей, которые читают в этой группе
  getTeacherList() {

    let teacherList = [];
    // let teacherList: string[] = [];

    for (var fio in this.timeTable) {
      for (var week in this.timeTable[fio]) {
        for (var day in this.timeTable[fio][week]) {
          for (var para in this.timeTable[fio][week][day]) {
            let facName = _.values(this.timeTable[fio][week][day][para])[0];
            let courseNumber = _.values(this.timeTable[fio][week][day][para])[1];
            let groupNumber = _.values(this.timeTable[fio][week][day][para])[2];
            let teacher = fio;
            if ((facName == studentFormResponse.facName)
              && (courseNumber == studentFormResponse.courseNumber)
              && (groupNumber == studentFormResponse.groupNumber)
              && (!(_.includes(teacherList, teacher)))) {
              teacherList.push(teacher);
            }
          }
        }
      }
    }

    return teacherList.sort();
  }

  getAuditoriaList() {

    let auditoriaList: string[] = [];

    _.each(this.timeTable, (fio) =>
      _.each(fio, (week) =>
        _.each(week, (day) =>
          _.each(day, (para) => {
              if (!(_.includes(auditoriaList, para[4]))) {
                auditoriaList.push(para[4]);
              }
            }
          )
        )
      )
    );

    return auditoriaList;
  }


   // извлекает из параметра первую группу, если на лекции их несколько
   // '1,2,3,4' - выберет 1-ю группу
  extractGroupNumber(groupsString){
    return groupsString.split(',')[0];
  }

}



// -------------- VARIABLES AND CONSTANTS ----------------------- \\

export const menuItemNames = {
  LEARNING_FORM: '-- Форма навчання',
  FACULTY_NAME: '-- Факультет',
  COURSE_NUMBER: '-- Курс',
  GROUP_NUMBER: '-- Група',
  DISCIPLINE: '-- Фільтр по дисципліні',
  TEACHER_NAME: '-- Фільтр по викладачу'
};
export const weekNames = ['Перший тиждень', 'Другий тиждень'];
export const dayNamesList = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
export const paraNamberList = ['1', '2', '3', '4', '5', '6', '7'];

export const WeekDayPara = {
  'Перший тиждень': {
    'Понеділок': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'Вівторок': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'Середа': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'Четвер': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'П\'ятниця': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'Субота': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []}
  },
  'Другий тиждень': {
    'Понеділок': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'Вівторок': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'Середа': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'Четвер': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'П\'ятниця': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []},
    'Субота': {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': []}
  }
};

// common  switches and shared variables
export const sharedData = {
  studentButtonClicked: false,
  teacherButtonClicked: false,
  auditoriaButtonClicked: false,
  roomClicked: false,
  selectedRoom: ''
};

//todo use `interface` instesd !!!
// store dialogue form responses
export const studentFormResponse = {
  learningForm: '',
  facName: '',
  courseNumber: '',
  groupNumber: '',
  discipline: '',
  teacher: ''
};
export const teacherFormResponse = {
  teacherName: '',
  discipline: ''
};

