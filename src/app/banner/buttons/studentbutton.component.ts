import {Component, ViewChild} from '@angular/core';
import {DialogueStudentComponent} from '../../dialog/studentmodal/dialogue.component';

@Component({
  selector: 'tt-studentbutton',
  templateUrl: './studentbutton.component.html'
})
export class StudentbuttonComponent {

  @ViewChild(DialogueStudentComponent)
  dlgWindow: DialogueStudentComponent;

  // mainBtnClass:string = "btn btn-primary-outline btn-block";

  // при (click) на кнопках банера делаем видимым модальное окно
  onClick() {
    // open modal dialogue window
    this.dlgWindow.show();
  }


  constructor() {
  }

}
