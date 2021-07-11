import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddEventComponent } from './components/add-event/add-event.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  darkThemeChecked = true;

  constructor(public dialog: MatDialog) { }

  onThemeChange(): void {
    this.darkThemeChecked = !this.darkThemeChecked;
    if (this.darkThemeChecked) {
      document.getElementsByTagName('body')[0].classList.remove('light-theme');
    } else {
      document.getElementsByTagName('body')[0].classList.add('light-theme');
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEventComponent, { width: '60vw', data: { name: '' } });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ', result);
    });
  }

}
