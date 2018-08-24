import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RulesComponent } from './rules/rules.component';
import { AddScoreModalComponent } from './schedule/add-score-modal/add-score-modal.component';
import { AddGameScoreModalComponent } from './schedule/add-game-score-modal/add-game-score-modal.component';
import { RuleCardComponent } from './rules/rule-card/rule-card.component';
import { AuthorityGuard } from "../authority.guard";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthorityGuard] },
      { path: 'schedule', component: ScheduleComponent, canActivate: [AuthorityGuard] },
      { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthorityGuard] },
      { path: 'rules', component: RulesComponent, canActivate: [AuthorityGuard] }
    ]),
      FormsModule
  ],
  declarations: [
    DashboardComponent,
    ScheduleComponent,
    LeaderboardComponent,
    RulesComponent,
    AddScoreModalComponent,
    AddGameScoreModalComponent,
    RuleCardComponent
  ],
    entryComponents: [
        AddScoreModalComponent,
        AddGameScoreModalComponent
    ],
    providers: [
        AuthorityGuard
    ]
})
export class FeaturesModule { }
