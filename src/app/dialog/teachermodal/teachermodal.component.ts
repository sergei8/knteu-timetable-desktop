import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {BodyteacherComponent} from './bodyteacher.component';
import {sharedData, menuItemNames, teacherFormResponse} from '../../data.service';

@Component({
  selector: 'tt-teachermodal',
  templateUrl: './teachermodal.component.html'
})


export class TeachermodalComponent {
  // modal window decorator
  @ViewChild('teacherModal')
  modal: ModalComponent; // объект модального окна

  // body-modal components decorator
  @ViewChild(BodyteacherComponent)
  dlgTeacher: BodyteacherComponent;   // reference to child component of teacher


  show() {
    this.modal.open();
    sharedData.roomClicked = sharedData.teacherButtonClicked =  sharedData.auditoriaButtonClicked = false;
  }

  processForm() {
    sharedData.teacherButtonClicked = true; // turn on `if` for timetable
    sharedData.roomClicked = sharedData.studentButtonClicked = sharedData.auditoriaButtonClicked = false;
    this.modal.dismiss();

  }

  cancel() {
    this.modal.dismiss();
    sharedData.roomClicked = sharedData.teacherButtonClicked = sharedData.studentButtonClicked = sharedData.auditoriaButtonClicked = false;
  }


  constructor() {

  }
}
