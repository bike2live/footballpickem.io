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
    today: Date;


    constructor(private dataService: DataService) {
        this.currentGame = new Game();
        this.today = new Date();
    }

    ngOnInit() {
        this.getSchedule();
    }

    getSchedule() {
        this.dataService.getSchedule().subscribe(
            (data: Game[]) => {
                data.filter( game => {
                    game.gameDate = game.gameDate.replace(' ', 'T') + 'Z';
                    game.closeDate = game.closeDate.replace(' ', 'T') + 'Z';
                    game.showUntilDate = game.showUntilDate.replace(' ', 'T') + 'Z';
                });
                this.schedule = data;
                this.today = new Date();
                this.currentGame = this.processSchedule(this.today, this.schedule);
                this.getWeeklyUserGuesses(this.currentGame.id);
            },
            (err: any) => console.log(err)
        );
    };

    private processSchedule(now: Date, games: Game[]): Game {

        //var today = new Date(Date.parse("09/18/2014 00:00:00"));
        let currentGame = games[0];
        let previousGameDate = new Date("11/30/2013");
        let previousShowUntilDate = new Date("01/01/2014");
        let previousCloseDate = new Date("01/01/2014");
        games.filter(game => {
            if (game.byuScore != null) {
                game.diff = game.byuScore - game.oppScore;  // this is used to determine if win or loss
            }

            // now we need to figure out which game to display on the dashboard
            let gameDate = new Date(Date.parse(game.gameDate));
            let closeDate = new Date(Date.parse(game.closeDate));
            let showUntilDate = new Date(Date.parse(game.showUntilDate));
            if (now > previousShowUntilDate && now < showUntilDate) {
                currentGame = game;
                this.isEditable = now < closeDate;
            }

            previousGameDate = gameDate;
            previousShowUntilDate = showUntilDate;
            previousCloseDate = closeDate;
        });

        return currentGame;

    }

    getWeeklyUserGuesses(currentGameId): void {
        this.dataService.getWeeklyGuesses(currentGameId).subscribe(
            (data: WeeklyGuess[]) => {
                this.weeklyGuesses = data;
            }
        );
    };

    isHomeGame() {
        return this.currentGame.location === 'Provo, UT';
    };

    showScore(userGuess: WeeklyGuess): boolean {
        return (userGuess.byuScore > 0 && userGuess.oppScore > 0);
    };

    hasScore(userGuess: WeeklyGuess): boolean {
        return (userGuess.byuScore > 0 && userGuess.oppScore > 0); // ? "fa-check text-success" : "fa-exclamation-triangle text-danger";
    };


}
