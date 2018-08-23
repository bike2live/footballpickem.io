import {Component, OnInit} from '@angular/core';
import {DataService} from "../../core/data.service";
import {tap} from "rxjs/internal/operators";
import {Game} from "../game";
import {PlayerStanding} from "../leaderboard/player-standing";
import {WeeklyGuess} from "./weekly-guess";

@Component({
    selector: 'fp-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    schedule: Game[];
    now: Date;
    currentGame: Game;
    weeklyGuesses: WeeklyGuess[];
    isEditable: boolean;


    constructor(private dataService: DataService) {
        this.currentGame = new Game();
    }

    ngOnInit() {
        this.getSchedule();
    }

    getSchedule() {
        this.dataService.getSchedule().subscribe(
            (data: Game[]) => {
                this.schedule = data;
                this.processSchedule();
                this.getWeeklyUserGuesses(this.currentGame.id);
            },
            (err: any) => console.log(err)
        );
    };

    private processSchedule() {

        let today = new Date();
        //var today = new Date(Date.parse("09/18/2014 00:00:00"));
        let previousGameDate = new Date("11/30/2013");
        let previousShowUntilDate = new Date("01/01/2014");
        let previousCloseDate = new Date("01/01/2014");
        this.schedule.filter(game => {
            if (game.byuScore != null) {
                game.diff = game.byuScore - game.oppScore;  // this is used to determine if win or loss
            }

            // now we need to figure out which game to display on the dashboard
            let gameDate = new Date(Date.parse(game.gameDate));
            let closeDate = new Date(Date.parse(game.closeDate));
            let showUntilDate = new Date(Date.parse(game.showUntilDate));
            if (today > previousShowUntilDate && today < showUntilDate) {
                this.currentGame = game;
                this.isEditable = today < closeDate;
            }
            previousGameDate = gameDate;
            previousShowUntilDate = showUntilDate;
            previousCloseDate = closeDate;
        });

        return this.currentGame;

    }

    getWeeklyUserGuesses(currentGame) {
        this.dataService.getWeeklyGuesses(this.currentGame.id).subscribe(
            (data: WeeklyGuess[]) => {
                this.weeklyGuesses = data;
            }
        );

    };

    isHomeGame() {
        return this.currentGame.location === 'Provo, UT';
    };

    hideScore = function(userGuess) {
        return (userGuess.byuScore > 0 && userGuess.oppScore > 0) ? "fa-star text-success" : "fa-minus text-danger";
    };

    hasScore = function(userGuess) {
        return (userGuess.byuScore > 0 && userGuess.oppScore > 0) ? "fa-check text-success" : "fa-exclamation-triangle text-danger";
    };


}
