import { Component, OnInit } from '@angular/core';

import {Game} from "../../game";
import {BsModalRef} from "ngx-bootstrap";
import {DataService} from "../../../core/data.service";
import {UserScore} from "../add-score-modal/userScore";

@Component({
  selector: 'fp-add-game-score-modal',
  templateUrl: './add-game-score-modal.component.html',
  styleUrls: ['./add-game-score-modal.component.scss']
})
export class AddGameScoreModalComponent implements OnInit {
    game: Game;
    errMessage: string;

    constructor(public bsModalRef: BsModalRef,
                private dataService: DataService) {
    }

  ngOnInit() {
  }

  save() {
      // console.log('game: ', this.game);
      this.errMessage = undefined;
      this.dataService.editGameScore(this.game)
          .subscribe(
              (data: Game) => {
                  this.game = data;
                  this.bsModalRef.hide();
              },
              (err: any) => {
                  console.log('Error saving game score: ', err);
                  this.errMessage = err;
              }
          );
  }

  cancel() {
      this.bsModalRef.hide();
  }
}
