import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {DataService, sharedData} from '../../data.service';
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
  corpusLeter: string;
  // private roomNumber: string;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  // extract auditoria list from timeTable for exact week,day,para into busyauditoriaListList
  // compare busyauditoriaListList with getauditorialist() and determine  freeauditoriaList
  // create from emptyroom object {'<corpus.':[<auditoria list>],...}
  //
  getAuditoriaByPara(): any {

    const busyAuditoriaList = this.getBusyRoomList();

    // create list of empty room as difference between all auditoria and busy
    const emptyRoomList = _.difference(this.dataService.getAuditoriaList(), busyAuditoriaList);

    // create object `room by corpus`
    const emptyRoomByCorpus = _.groupBy(emptyRoomList, (room) => this.extractCorpusLetter(room));

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
    // let t1 = Date.now();
    const busyRoomList = this.getBusyRoomList();
    const emptyRoomList = _.difference(this.dataService.getAuditoriaList(), busyRoomList);
    let emptyRoomByCorpus = _.groupBy(emptyRoomList, (room) => this.extractCorpusLetter(room)); // room[0] - буква корпуса
    //console.log(emptyRoomByCorpus[corpus].sort());
    this.emptyRoomList = emptyRoomByCorpus[corpus].sort();
    /*
     let t2 = Date.now();
     console.log((t2 - t1) / 1000);
     */

    // console.log(this.emptyRoomList);
  };

  // create busy rooms per week-day-para
  getBusyRoomList() {
    const busyRoomList = [];
    let w = this.week;
    let d = this.day;
    let p = this.para;

    for (let fio in this.dataService.timeTable) {
      if (w in this.dataService.timeTable[fio]) {
        if (d in this.dataService.timeTable[fio][w]) {
          if (p in this.dataService.timeTable[fio][w][d]) {
            busyRoomList.push(this.dataService.timeTable[fio][w][d][p][4]); // [4] - аудитория
          }
        }
      }
    }
    // console.log(busyRoomList);
    return busyRoomList;
  }

  showRoom(roomNumber) {
    console.log(roomNumber);
    sharedData.selectedRoom = roomNumber;
    sharedData.roomClicked = true;
    sharedData.auditoriaButtonClicked = false;
  }


  extractCorpusLetter(room) {
    if (_.includes(['А', 'Б', 'В', 'Г', 'Д', 'Л', 'М', 'Н', 'Р'], room[0])) {
      return room[0];
    }
    else {
      return 'ін.';
    }
  }



}
