import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { CountdownData } from 'src/app/utils/countdown';
import { ActionEvent } from 'src/app/utils/action-events';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})

export class ListEventsComponent implements OnChanges {

  @Input() countdowns: string = '';
  @Output() returnEvents = new EventEmitter<ActionEvent>();

  allCountdowns: Array<CountdownData> = [];
  selectedEvent: ActionEvent = {
    type: '',
    id: -1,
    events: {
      name: '',
      date: '',
      selected: false,
    }
  };

  ngOnChanges(): void {
    console.log(this.countdowns);
    if (!!this.countdowns) {
      this.allCountdowns = JSON.parse(this.countdowns);
    }
  }

  sorted(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allCountdowns, event.previousIndex, event.currentIndex);
  }

  actionEvents(type: string, id: number, event: CountdownData): void {
    this.selectedEvent.type = type;
    this.selectedEvent.id = id;
    this.selectedEvent.events = event;
    this.returnEvents.emit(this.selectedEvent);
  }

}
