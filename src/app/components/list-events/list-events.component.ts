import { Component, Input, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { CountdownData } from 'src/app/utils/countdown';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})

export class ListEventsComponent implements OnChanges {

  @Input() countdowns: string = '';

  allCountdowns: Array<any> = [];

  ngOnChanges(): void {
    console.log(this.countdowns);
    if (!!this.countdowns) {
      this.allCountdowns = JSON.parse(this.countdowns);
    }
  }

  sorted(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allCountdowns, event.previousIndex, event.currentIndex);
  }

}
