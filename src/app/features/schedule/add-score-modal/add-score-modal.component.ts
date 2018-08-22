import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Game} from "../../game";
import {BsModalRef} from "ngx-bootstrap";
import {UserScore} from "./userScore";
import {DataService} from "../../../core/data.service";
import {User} from "../../../users/user";

@Component({
    selector: 'fp-add-score-modal',
    templateUrl: './add-score-modal.component.html',
    styleUrls: ['./add-score-modal.component.scss']
})
export class AddScoreModalComponent implements OnInit {
    game: Game;
    uid: number;
    userScore: UserScore = new UserScore();
    closeBtnName: string;

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
                this.userScore = data || { byuScore: 0, oppScore: 0, uid: 0, gameId: this.game.id};
            },
            (err: any) => console.log('Error getting userScore: ', err)
        );
    }

    save() {
        console.log('userScore: ', this.userScore);
        this.bsModalRef.hide();
    }

    cancel() {
        this.bsModalRef.hide();
    }

}
