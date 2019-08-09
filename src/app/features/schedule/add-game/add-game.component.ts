import { Component, OnInit } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap";
import { DataService } from "../../../core/data.service";
import { Game } from "../../game";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'fp-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  game: Game;
  errMessage: string;
  editGameForm = this.fb.group({
    week: new FormControl('0', [Validators.required, Validators.min(1), Validators.max(14)]),
    opponent: new FormControl(''),
    location: new FormControl(''),
    stadium: new FormControl(''),
    homeOrAway: new FormControl('1'),
    ha: new FormControl('1'),
    gameDate: new FormControl('')
  });

  constructor(public bsModalRef: BsModalRef,
              public fb: FormBuilder,
              private dataService: DataService) {
  }

  ngOnInit() {
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
