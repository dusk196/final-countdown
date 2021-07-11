import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';

// Icons
import { MatIconModule } from '@angular/material/icon'

// CDK
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    // Components
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSidenavModule,
    // Icons
    MatIconModule,
    // CDK
    DragDropModule
  ]
})

export class MaterialModule { }
