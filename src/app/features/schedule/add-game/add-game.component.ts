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

    this.onValueChanges();
  }

  onValueChanges(): void {
    this.gameDate.valueChanges.subscribe( value => {
      console.log('gameDateUpdated. gameDate: ', value);
      if (this.gameTime.value !== value) {
        this.gameTime.setValue(value);
        console.log('this.gameTime: ', this.gameTime.value);
      }
    });
    this.gameTime.valueChanges.subscribe( value => {
      console.log('gameTimeUpdated. gameTime: ', value);
      if (this.gameDate.value !== value) {
        this.gameDate.setValue(value);
        console.log('this.gameDate: ', this.gameDate.value);
      }
    })
  }

  gameDateUpdated() {
    console.log('gameDateUpdated. gameDate: ', this.gameDate.value);
    this.gameTime.setValue(this.gameDate.value);
    console.log('this.gameTime: ', this.gameTime.value);
  }

  gameTimeUpdated() {
    console.log('gameTimeUpdated. gameTime: ', this.gameTime.value);
    this.gameDate.setValue(this.gameTime.value);
    console.log('this.gameDate: ', this.gameDate.value);
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
