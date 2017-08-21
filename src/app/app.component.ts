import {Component} from '@angular/core';
import {globalSwitches} from './data.service';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html'
})
export class AppComponent {



  isStudentButtonClicked() {
    return globalSwitches.studentButtonClicked;
  }

  isTeacherButtonClicked() {
    return globalSwitches.teacherButtonClicked;
  }

  isAuditoriaButtonClicked() {
    return globalSwitches.auditoriaButtonClicked;
  }

  isRoomClicked() {
    return globalSwitches.roomClicked;
  }
}
