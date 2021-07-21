import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppService } from 'src/app/app.service';
import { DateInputs } from 'src/app/utils/date-inputs';
import { CalendarEvents } from 'src/app/utils/calendar-events';

import * as _enums from 'src/app/utils/countdown.enum';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})

export class AddEventComponent implements OnInit {

  minDate: Date = new Date();
  isHolidaysLoaded: Boolean = false;
  eventList: Array<CalendarEvents> = [];
  currentYear = new Date().getFullYear();
  msg: String = '';

  enums = _enums;

  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  constructor(public dialogRef: MatDialogRef<AddEventComponent>, @Inject(MAT_DIALOG_DATA) public data: DateInputs, private appService: AppService) { }

  ngOnInit(): void {
    const holidays = localStorage.getItem('countdown-holidays');
    if (!!holidays) {
      try {
        const temp = JSON.parse(holidays);
        if (temp.year === this.currentYear) {
          this.eventList = temp.eventList;
          this.isHolidaysLoaded = true;
        }
        else
          this.callCalendarApi();
      } catch (err: unknown) {
        this.callCalendarApi()
      }
    } else {
      this.callCalendarApi();
    }
  }

  callCalendarApi(): void {
    this.appService.getCalendarEvents().subscribe(
      (data: any) => {
        const presentEvents = data.items.filter((x: any) => new Date(x.start.date).getFullYear() === this.currentYear);
        const futureEvents = data.items.filter((x: any) => new Date(x.start.date).getFullYear() === this.currentYear + 1);
        this.eventList.push(
          { year: this.currentYear, events: presentEvents },
          { year: this.currentYear + 1, events: futureEvents }
        );
        localStorage.setItem(this.enums.localStorage.Holidays, JSON.stringify({ year: this.currentYear, eventList: this.eventList }));
      },
      (err: Error) => {
        console.error('Error while receiving event lists: ', err)
        this.msg = 'Error while receiving event lists. Please try again later or input manually';
      },
      () => {
        this.isHolidaysLoaded = true;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
