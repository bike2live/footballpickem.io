import { Component, OnInit } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap";
import { DataService } from "../../../core/data.service";
import { Game } from "../../game";
import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'fp-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  game: Game;
  uid: string;
  errMessage: string;
  editGameForm: FormGroup;
  week: FormControl;
  opponent: FormControl;
  location: FormControl;
  stadium: FormControl;
  homeOrAway: FormControl;
  gameDate: FormControl;
  gameTime: FormControl;

  constructor(public bsModalRef: BsModalRef,
              public fb: FormBuilder,
              private dataService: DataService) {
  }

  ngOnInit() {
    console.log('game: ', this.game);

    this.week = new FormControl(this.game.week, [Validators.required, Validators.min(1), Validators.max(14)]);
    this.opponent = new FormControl(this.game.opponent);
    this.location = new FormControl(this.game.location);
    this.stadium = new FormControl(this.game.stadiumName);
    this.homeOrAway = new FormControl(this.game.homeOrAway);


    let gameDate = new Date(this.game.gameDate);
    console.log('gameDate: ', gameDate);
    this.gameDate = new FormControl(gameDate);
    this.gameTime = new FormControl(gameDate);

    this.editGameForm = this.fb.group({
      week: this.week,
      opponent: this.opponent,
      location: this.location,
      stadium: this.stadium,
      homeOrAway: this.homeOrAway,
      gameDate: this.gameDate,
      gameTime: this.gameTime
    });

    console.warn(this.editGameForm.value);
  }

  save() {
    console.warn(this.editGameForm.value);

    // console.log('game: ', this.game);
/*
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
*/
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
