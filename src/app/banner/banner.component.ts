import {Component} from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'tt-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent {

  constructor(private dataService: DataService) {

    // подписаться на событие получения данных
    this.dataService.getTimeTable()
      .subscribe(response => {
        dataService.timeTable = response;
        // console.log(response);
      });
  }

}

