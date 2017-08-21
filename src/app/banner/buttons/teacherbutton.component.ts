import {Component, ViewChild} from '@angular/core';
import {TeachermodalComponent} from '../../dialog/teachermodal/teachermodal.component'

@Component({
  selector: 'tt-teacherbutton',
  templateUrl: './teacherbutton.component.html'
})
export class TeacherbuttonComponent  {

  @ViewChild(TeachermodalComponent)
  teacherDlgWindow: TeachermodalComponent;

  constructor() {
  }

  onClick() {
    // open modal dialogue window
    this.teacherDlgWindow.show();
  }


}
