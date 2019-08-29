import { Component, OnInit } from '@angular/core';
import { utc } from 'moment';
import { BsModalRef } from "ngx-bootstrap";
import { DataService } from "../../../core/data.service";
import { Game } from "../../game";
import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';

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
  closeDate: FormControl;
  closeTime: FormControl;
  showUntilDate: FormControl;
  showUntilTime: FormControl;

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

    // convert the date from utc into a local date
    let gameDate = moment.utc(this.game.gameDate).toDate();
    console.log('gameDate: ', gameDate);
    this.gameDate = new FormControl(gameDate);
    this.gameTime = new FormControl(gameDate);

    // convert the date from utc into a local date
    let closeDate = moment.utc(this.game.closeDate).toDate();
    console.log('closeDate: ', closeDate);
    this.closeDate = new FormControl(closeDate);
    this.closeTime = new FormControl(closeDate);

    // convert the date from utc into a local date
    let showUntilDate = moment.utc(this.game.showUntilDate).toDate();
    console.log('showUntilDate: ', showUntilDate);
    this.showUntilDate = new FormControl(showUntilDate);
    this.showUntilTime = new FormControl(showUntilDate);

    this.editGameForm = this.fb.group({
      week: this.week,
      opponent: this.opponent,
      location: this.location,
      stadium: this.stadium,
      homeOrAway: this.homeOrAway,
      gameDate: this.gameDate,
      gameTime: this.gameTime,
      closeDate: this.closeDate,
      closeTime: this.closeTime,
      showUntilDate: this.showUntilDate,
      showUntilTime: this.showUntilTime
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
    });

    this.closeDate.valueChanges.subscribe( value => {
      console.log('closeDateUpdated. closeDate: ', value);
      if (this.closeTime.value !== value) {
        this.closeTime.setValue(value);
        console.log('this.closeTime: ', this.closeTime.value);
      }
    });
    this.closeTime.valueChanges.subscribe( value => {
      console.log('closeTimeUpdated. closeTime: ', value);
      if (this.closeDate.value !== value) {
        this.closeDate.setValue(value);
        console.log('this.closeDate: ', this.closeDate.value);
      }
    });

    this.showUntilDate.valueChanges.subscribe( value => {
      console.log('showUntilDateUpdated. showUntilDate: ', value);
      if (this.showUntilTime.value !== value) {
        this.showUntilTime.setValue(value);
        console.log('this.showUntilTime: ', this.showUntilTime.value);
      }
    });
    this.showUntilTime.valueChanges.subscribe( value => {
      console.log('showUntilTimeUpdated. showUntilTime: ', value);
      if (this.showUntilDate.value !== value) {
        this.showUntilDate.setValue(value);
        console.log('this.showUntilDate: ', this.showUntilDate.value);
      }
    });
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

    // convert local date to utc date
    let utcDate = moment(this.gameDate.value).utc().format("YYYY-MM-DD HH:mm:ss");
    console.log('utcDate: ', utcDate);

    // console.log('game: ', this.game);
    this.errMessage = undefined;
    const gameToSave = {...this.game};
    gameToSave.gameDate = utcDate;
    // todo: when we create controls for these, get the value from the controls
    gameToSave.closeDate = moment(this.closeDate.value).utc().format("YYYY-MM-DD HH:mm:ss");
    gameToSave.showUntilDate = moment(this.showUntilDate.value).utc().format("YYYY-MM-DD HH:mm:ss");
    this.dataService.editGame(gameToSave)
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
