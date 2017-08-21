import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {DataService, globalSwitches} from '../../data.service';
import {ModalDirective} from 'ng2-bootstrap';


import * as _ from 'lodash';

@Component({
  selector: 'tt-corpus-list',
  templateUrl: './corpus-list.component.html'
})

export class CorpusListComponent implements OnInit {

  @ViewChild('roomList') public roomList: ModalDirective;

  @Input() week: string;
  @Input() day: string;
  @Input() para: string;

  emptyRoomList: string[];
  private corpusLeter: string;
  private roomNumber:string;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  // extract auditoria list from timeTable for exact week,day,parf into busyauditoriaListList
  // compare busyauditoriaListList with getauditorialist() and determine  freeauditoriaList
  // create from emptyroom object {'<corpus.':[<auditoria list>],...}
  //
  getAuditoriaByPara(): any {

    let busyAuditoriaList = this.getBusyRoomList();

    // create list of empty room as difference between all auditoria and busy
    let emptyRoomList = _.difference(this.dataService.getAuditoriaList(), busyAuditoriaList);

    // create object `room by corpus`
    let emptyRoomByCorpus = _.groupBy(emptyRoomList, (room) => room[0]);

    // sort by room number
    _.each(emptyRoomByCorpus, corpusList => corpusList.sort());

    // sort by corpus number
    // console.log(_.toPairs(emptyRoomByCorpus));
    return _.sortBy(_.toPairs(emptyRoomByCorpus), corpus => corpus[0]);

  }

//todo пріменіть JSDoc ! https://www.jetbrains.com/help/webstorm/2016.3/creating-jsdoc-comments.html
  /**
   *
   * @param corpus
   */
  getCorpusDetail(corpus: string) {

    this.corpusLeter = corpus;

    // console.log('Detail!', week);
    let busyRoomList = this.getBusyRoomList();
    let emptyRoomList = _.difference(this.dataService.getAuditoriaList(), busyRoomList);
    let emptyRoomByCorpus = _.groupBy(emptyRoomList, (room) => room[0]);
    //console.log(emptyRoomByCorpus[corpus].sort());
    this.emptyRoomList = emptyRoomByCorpus[corpus].sort()
    console.log(this.emptyRoomList);
  };

  // create busy rooms per week-day-para
  getBusyRoomList() {
    let busyRoomList = [];
    let w = this.week;
    let d = this.day;
    let p = this.para;

    for (let fio in this.dataService.timeTable) {
      if (w in this.dataService.timeTable[fio]) {
        if (d in this.dataService.timeTable[fio][w]) {
          if (p in this.dataService.timeTable[fio][w][d]) {
            busyRoomList.push(this.dataService.timeTable[fio][w][d][p][4]);
          }
        }
      }
    }
    return busyRoomList;
  }

  showRoom(roomNumber) {
    console.log(roomNumber);
    globalSwitches.selectedRoom = roomNumber;
    globalSwitches.roomClicked = true;
    globalSwitches.auditoriaButtonClicked = false;
  }

}
