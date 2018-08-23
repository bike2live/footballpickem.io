import { Component, OnInit } from '@angular/core';
import {DataService} from "../../core/data.service";
import {PlayerStanding} from "./player-standing";
import {Game} from "../game";

@Component({
  selector: 'fp-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  scores: PlayerStanding[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getPlayerStandings();
  }

  getPlayerStandings(): void {
    this.dataService.getPlayerStandings().subscribe(
        (data: PlayerStanding[]) => {
            this.scores = data;
        },
        (err: any) => console.log(err)
    );
  }

}
