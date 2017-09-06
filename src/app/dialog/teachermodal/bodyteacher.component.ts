import {Component} from '@angular/core';
import {DataService, menuItemNames, sharedData, teacherFormResponse} from '../../data.service';
import * as _ from 'lodash';

@Component({
  selector: 'tt-bodyteacher',
  templateUrl: './bodyteacher.component.html'
})

export class BodyteacherComponent {

  isTeacherNotSelected: boolean = true;

  disciplineList: string[] = [];
  selectedTeacher: string = '';

  constructor(private dataService: DataService) {
  }

  public teacherSelected(teacherName) {
    teacherFormResponse.teacherName = this.selectedTeacher;
    this.disciplineList = [];
    this.disciplineList.push(menuItemNames.DISCIPLINE);
    this.isTeacherNotSelected = false;
    // build list of disciplines for teacher
    let fio = this.dataService.timeTable[this.selectedTeacher];
    _.each(fio, week =>
      _.each(week, day =>
        _.each(day, para => {
            if (!_.includes(this.disciplineList, para[3]))
              this.disciplineList.push(para[3]);
          }
        )
      )
    )
  }

  // extract teachers list from `timeTable` as array
  getFullTeacherList() {
    // console.log(Object.keys(this.dataService.timeTable).sort());
    return Object.keys(this.dataService.timeTable).sort();
  }

  getDiscipline(disciplineName) {
    teacherFormResponse.discipline = disciplineName === menuItemNames.DISCIPLINE ? '' : disciplineName;
  }


}
