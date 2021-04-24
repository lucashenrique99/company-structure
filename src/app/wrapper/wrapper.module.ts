import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrapperRoutingModule } from './wrapper-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmationDialogModule } from '../shared/components/confirmation-dialog/confirmation-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    MainNavComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    WrapperRoutingModule,

    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    ConfirmationDialogModule,
    MatDialogModule,
  ]
})
export class WrapperModule { }
