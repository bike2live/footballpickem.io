import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'schedule', component: ScheduleComponent }
    ])
  ],
  declarations: [
    DashboardComponent,
    ScheduleComponent
  ]
})
export class FeaturesModule { }
