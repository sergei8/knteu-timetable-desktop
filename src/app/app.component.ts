import {Component} from '@angular/core';
import {sharedData} from './data.service';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html'
})
export class AppComponent {


  //activate
  isStudentButtonClicked() {
    return sharedData.studentButtonClicked;
  }

  isTeacherButtonClicked() {
    return sharedData.teacherButtonClicked;
  }

  isAuditoriaButtonClicked() {
    return sharedData.auditoriaButtonClicked;
  }

  isRoomClicked() {
    return sharedData.roomClicked;
  }
}
