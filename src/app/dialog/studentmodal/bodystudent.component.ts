import {Component, OnInit} from '@angular/core';
import {DataService, menuItemNames, sharedData, studentFormResponse} from '../../data.service';

@Component({
  selector: 'tt-bodystudent',
  templateUrl: './bodystudent.component.html'
})
export class BodystudentComponent implements OnInit {

  // declare dataService in the constructor for binding to
  // DataService methods
  constructor(private dataService: DataService) {
  }

  // initialise menu data
  //todo: посмотреть надо ли тут инициализировать
  facNameList: string[] = [];
  courseList: string[] = [];
  groupList: string[] = [];
  disciplineList: string[] = [];
  teacherList: string[] = [];

  // группа переключателей для отключения disabled в select
  // чтобы последовательно активировать менюшки
  isLearningFormSelected: boolean = true;
  isFacNameSelected: boolean = true;
  isCourseSelected: boolean = true;
  isGroupSelected: boolean = true;
  isDisciplineSelected: boolean = true;
  isTeacherSelected: boolean = true;


  learningFormChanged(selectedValue: string) {
    this.isLearningFormSelected = false;   // отключить [disabled] в facNameList
    studentFormResponse.learningForm = selectedValue; // значение передано через event
    this.facNameList = [menuItemNames.FACULTY_NAME].concat( this.dataService.getFacNameList());
  }

  facNameChanged(selectedValue: string) {
    this.isFacNameSelected = false;   // отключить [disabled] в courseList
    studentFormResponse.facName = selectedValue;
    this.courseList = [menuItemNames.COURSE_NUMBER].concat( this.dataService.getCourseList());
    //console.log("course:", this.courseList);
    this.isCourseSelected = this.isGroupSelected = true;   // turn on [disabled] в groupList

  }

  courseChanged(selectedValue: string) {
    this.isCourseSelected = false;   // отключить [disabled] в groupList
    studentFormResponse.courseNumber = selectedValue;
    this.groupList = [menuItemNames.GROUP_NUMBER].concat(this.dataService.getGroupList());
    this.disciplineList = this.teacherList = [];  // reset filters
  }

  groupChanged(selectedValue: string) {
    studentFormResponse.groupNumber = selectedValue;
    this.disciplineList = [menuItemNames.DISCIPLINE].concat(this.dataService.getDiscilpileList());
    this.teacherList = [menuItemNames.TEACHER_NAME].concat(this.dataService.getTeacherList());
    // enable filters only if group selected
    //todo: что-то тут не так
    this.isGroupSelected = false || studentFormResponse.groupNumber == menuItemNames.GROUP_NUMBER;   // отключить [disabled] в discipline and teacherd
  }

  disciplineChanged(selectedValue: string) {
    // empty filter if item not selected (i.e. == item name)
    studentFormResponse.discipline = (selectedValue === menuItemNames.DISCIPLINE ? '' : selectedValue);
    // switch flag if real discipline was select
    this.isDisciplineSelected = studentFormResponse.discipline == '';
    this.isTeacherSelected = true;
  }

  teacherChanged(selectedValue: string) {
    // empty filter if item not selected (i.e. == item name)
    studentFormResponse.teacher = (selectedValue === menuItemNames.TEACHER_NAME ? '' : selectedValue);
    this.isTeacherSelected = studentFormResponse.teacher == '';
    this.isDisciplineSelected = true;
  }

  ngOnInit() {
  }

}

