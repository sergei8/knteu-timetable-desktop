import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {BodystudentComponent} from './bodystudent.component';
import {globalSwitches, studentFormResponse, menuItemNames} from '../../data.service';

@Component({
  selector: 'tt-student-dialogue',
  templateUrl: './dialogue.component.html'
})
export class DialogueStudentComponent implements OnInit {

  // modal window decorator
  @ViewChild('modalDlgWindow')
  modal: ModalComponent; // объект модального окна

  // body-modal components decorator
  @ViewChild(BodystudentComponent)
  dlgStudent: BodystudentComponent;   // reference to child component of student

  constructor() {
  }

  ngOnInit() {
  }

  //TODO найти возможность сбросить форму в дефолт после нажатия (OnDestroy)!!!
  processForm() {
    globalSwitches.studentButtonClicked = true;
    globalSwitches.teacherButtonClicked = globalSwitches.auditoriaButtonClicked = false;

    //TODO: передать dlgStudent на обработку в student-timetable
    this.modal.dismiss();
  }

  // вызывается из родительской компоненты
  // и вызывает метод модальноого окна
  show() {
    this.modal.open();
    globalSwitches.auditoriaButtonClicked = globalSwitches.studentButtonClicked = false;
  }


  cancel() {
    this.modal.dismiss();
    globalSwitches.teacherButtonClicked = globalSwitches.studentButtonClicked = globalSwitches.auditoriaButtonClicked = false;
  }


}

