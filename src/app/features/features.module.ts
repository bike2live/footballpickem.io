import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GameResolver } from './game-resolver.service';
import { ScheduleComponent } from './schedule/schedule.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RulesComponent } from './rules/rules.component';
import { AddScoreModalComponent } from './schedule/add-score-modal/add-score-modal.component';
import { AddGameScoreModalComponent } from './schedule/add-game-score-modal/add-game-score-modal.component';
import { RuleCardComponent } from './rules/rule-card/rule-card.component';
import { AuthorityGuard } from "../authority.guard";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddGameComponent } from './schedule/add-game/add-game.component';
import { BsDatepickerModule, TimepickerModule } from "ngx-bootstrap";
import { GameResultsComponent } from './game-results/game-results.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'dashboard', component: DashboardComponent, canActivate: [AuthorityGuard]},
            {path: 'schedule', component: ScheduleComponent, canActivate: [AuthorityGuard]},
            {path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthorityGuard]},
            {path: 'rules', component: RulesComponent, canActivate: [AuthorityGuard]},
            {path: 'game/:id', component: GameResultsComponent, canActivate: [AuthorityGuard], resolve: {game: GameResolver} }
        ]),
        FormsModule,
        FontAwesomeModule,
        BsDatepickerModule,
        TimepickerModule
    ],
    declarations: [
        DashboardComponent,
        ScheduleComponent,
        LeaderboardComponent,
        RulesComponent,
        AddScoreModalComponent,
        AddGameScoreModalComponent,
        RuleCardComponent,
        AddGameComponent,
        GameResultsComponent
    ],
    entryComponents: [
      AddGameComponent,
      AddScoreModalComponent,
      AddGameScoreModalComponent
    ],
    providers: [
        AuthorityGuard
    ]
})
export class FeaturesModule {
}
