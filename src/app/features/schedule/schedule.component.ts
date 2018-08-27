import {Component, OnInit} from '@angular/core';

import {DataService} from '../../core/data.service';
import {User} from '../../users/user';
import {Game} from "../game";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AddScoreModalComponent} from "./add-score-modal/add-score-modal.component";
import {AddGameScoreModalComponent} from "./add-game-score-modal/add-game-score-modal.component";
import {AuthService} from "../../users/auth.service";

@Component({
    selector: 'fp-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    user: User;
    schedule: Game[];
    now: Date;
    admin: boolean;
    bsModalRef: BsModalRef;

    constructor(private dataService: DataService,
                private authService: AuthService,
                private modalService: BsModalService) {
        this.admin = false;
    }

    ngOnInit() {
        this.admin = this.authService.isAdmin();
        this.user = this.authService.getUser();

        // console.log(' scheduleComponent: user: ', this.user);

        this.dataService.getSchedule().subscribe(
            (data: Game[]) => {
                data.filter( game => {
                    if (game.byuScore != null) {
                        game.diff = game.byuScore - game.oppScore;
                    }
                    game.gameDate = game.gameDate.replace(' ', 'T') + 'Z';
                    game.closeDate = game.closeDate.replace(' ', 'T') + 'Z';
                    game.showUntilDate = game.showUntilDate.replace(' ', 'T') + 'Z';
                });
                this.schedule = data;
                this.now = new Date();
            },
            (err: any) => console.log(err)
        );
    }

    isHomeGame(game: Game) {
        return game.location === 'Provo, UT';
    }

    isGamePast(game: Game) {
        return this.now > new Date(Date.parse(game.gameDate));
    }

    isPastCloseDate(game) {
        return this.now > new Date(Date.parse(game.closeDate));
    }

    addScore(game: Game) {

        if (this.isPastCloseDate(game)) {
            alert('Oh snap, too late! You missed the cutoff time to enter a score for this game.');
            return;
        }

        const initialState = {
            game: game,
            uid: this.user.uid
        };

        // console.log('initialState: ', initialState);
        // console.log('user: ', this.user);

        this.bsModalRef = this.modalService.show(AddScoreModalComponent, {initialState});

    }

    addGameScore(game: Game) {

        const initialState = {
            game: game,
            uid: this.user.uid
        };

        // console.log('initialState: ', initialState);
        // console.log('user: ', this.user);

        this.bsModalRef = this.modalService.show(AddGameScoreModalComponent, {initialState});

    }
}
