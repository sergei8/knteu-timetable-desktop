import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {BodyteacherComponent} from './bodyteacher.component';
import {globalSwitches, menuItemNames, teacherFormResponse} from '../../data.service';

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
    globalSwitches.teacherButtonClicked =  globalSwitches.auditoriaButtonClicked = false;
  }

  processForm() {
    globalSwitches.teacherButtonClicked = true; // turn on `if` for timetable
    globalSwitches.studentButtonClicked = globalSwitches.auditoriaButtonClicked = false;
    this.modal.dismiss();

  }

  cancel() {
    this.modal.dismiss();
    globalSwitches.teacherButtonClicked = globalSwitches.studentButtonClicked = globalSwitches.auditoriaButtonClicked = false;
  }


  constructor() {

  }
}
