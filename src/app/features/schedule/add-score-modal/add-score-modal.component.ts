import {Component, OnInit} from '@angular/core';

import {Game} from "../../game";
import {BsModalRef} from "ngx-bootstrap";
import {UserScore} from "./userScore";
import {DataService} from "../../../core/data.service";

@Component({
    selector: 'fp-add-score-modal',
    templateUrl: './add-score-modal.component.html',
    styleUrls: ['./add-score-modal.component.scss']
})
export class AddScoreModalComponent implements OnInit {
    game: Game;
    uid: number;
    userScore: UserScore = new UserScore();
    errMessage: string;

    constructor(public bsModalRef: BsModalRef,
                private dataService: DataService) {
    }

    ngOnInit() {
        console.log(' modal game: ', this.game);
        console.log(' modal uid: ', this.uid);
        this.getUserScore();
    }

    private getUserScore(): void {
        this.dataService.getUserScore(this.game.id).subscribe(
            (data: UserScore) => {
                this.userScore = data || {byuScore: 0, oppScore: 0, uid: 0, gameId: this.game.id};
            },
            (err: any) => console.log('Error getting userScore: ', err)
        );
    }

    save() {
        console.log('userScore: ', this.userScore);
        this.errMessage = undefined;
        this.dataService.addUserScore(this.userScore)
            .subscribe(
                (data: UserScore) => {
                    this.userScore = data;
                    this.bsModalRef.hide();
                },
                (err: any) => {
                    console.log('Error saving user score: ', err);
                    this.errMessage = err;
                }
            );

    }

    cancel() {
        this.bsModalRef.hide();
    }

}
