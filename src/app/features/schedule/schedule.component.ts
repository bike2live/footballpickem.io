import {Component, OnInit} from '@angular/core';

import {DataService} from '../../core/data.service';
import {SessionError} from '../../session-error';
import {User} from '../../users/user';
import {Game} from "../game";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AddScoreModalComponent} from "./add-score-modal/add-score-modal.component";
import {AddGameScoreModalComponent} from "./add-game-score-modal/add-game-score-modal.component";

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
                private modalService: BsModalService) {
    }

    ngOnInit() {
        this.admin = true;
        this.now = new Date();
        this.dataService.getSession().subscribe(
            (data: User) => this.user = data,
            (err: SessionError) => console.log(err.friendlyMessage),
            () => console.log('got session  user: ', this.user)
        );

        this.dataService.getSchedule().subscribe(
            (data: Game[]) => {
                this.schedule = data;
                this.schedule.filter( game => {
                    if (game.byuScore != null) {
                        game.diff = game.byuScore - game.oppScore;
                    }
                })
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

        // if (this.isPastCloseDate(game)) {
        //     alert('Oh snap, too late! You missed the cutoff time to enter a score for this game.');
        //     return;
        // }

        const initialState = {
            game: game,
            uid: this.user.uid
        };

        console.log('initialState: ', initialState);
        console.log('user: ', this.user);

        this.bsModalRef = this.modalService.show(AddScoreModalComponent, {initialState});

    }

    addGameScore(game: Game) {

        const initialState = {
            game: game,
            uid: this.user.uid
        };

        console.log('initialState: ', initialState);
        console.log('user: ', this.user);

        this.bsModalRef = this.modalService.show(AddGameScoreModalComponent, {initialState});

    }
}
