import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddEventComponent } from 'src/app/components/add-event/add-event.component';
import { CountdownData } from 'src/app/utils/countdown';
import { DateInputs } from 'src/app/utils/date-inputs';
import { ActionEvent } from 'src/app/utils/action-events';

import * as _enums from 'src/app/utils/countdown.enum';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  darkThemeChecked = true;
  countdowns: Array<CountdownData> = [];
  cdStr: string = '';
  enums = _enums;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const savedEvents = localStorage.getItem(this.enums.localStorage.Name);
    if (!!savedEvents) {
      try {
        const events = JSON.parse(savedEvents);
        this.countdowns = events;
        this.cdStr = savedEvents;
      } catch (err: unknown) {
        localStorage.removeItem(this.enums.localStorage.Name);
      }
    }
  }

  onThemeChange(): void {
    this.darkThemeChecked = !this.darkThemeChecked;
    if (this.darkThemeChecked) {
      document.getElementsByTagName('body')[0].classList.remove('light-theme');
    } else {
      document.getElementsByTagName('body')[0].classList.add('light-theme');
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEventComponent, { width: '60vw', data: { name: '', date: moment(new Date(), 'Do of MMMM, YYYY') } });
    dialogRef.afterClosed().subscribe((result: DateInputs) => {
      if (!!result) {
        this.countdowns.forEach(element => {
          element.selected = false;
        });
        this.countdowns.unshift({ name: result.name, date: result.date.toString(), selected: true });
        this.cdStr = JSON.stringify(this.countdowns);
        this.storeSortedEvents(this.cdStr);
      }
    });
  }

  eventActions(event: ActionEvent) {
    console.log(event);
  }

  storeSortedEvents(events: string) {
    localStorage.setItem(this.enums.localStorage.Name, events);
  }

}
