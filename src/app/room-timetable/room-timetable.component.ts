import {Component} from '@angular/core';
import {globalSwitches} from '../data.service';

@Component({
  selector: 'tt-room-timetable',
  templateUrl: './room-timetable.component.html'
})
export class RoomTimetableComponent {
  private roomNumber: string

  constructor() {
    this.roomNumber = globalSwitches.selectedRoom;
    console.log(this.roomNumber);
  }


}
