import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RulesComponent } from './rules/rules.component';
import { AddScoreModalComponent } from './schedule/add-score-modal/add-score-modal.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'leaderboard', component: LeaderboardComponent },
      { path: 'rules', component: RulesComponent }
    ]),
      FormsModule
  ],
  declarations: [
    DashboardComponent,
    ScheduleComponent,
    LeaderboardComponent,
    RulesComponent,
    AddScoreModalComponent
  ],
    entryComponents: [
        AddScoreModalComponent
    ]
})
export class FeaturesModule { }
