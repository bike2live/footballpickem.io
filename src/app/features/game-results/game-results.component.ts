import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';
import { Game } from '../game';
import { GameResults } from '../game-results';

@Component({
  selector: 'fp-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent implements OnInit {
  gameResults: GameResults[];

  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
    this.gameResults = this.route.snapshot.data['gameResults'];
  }

  ngOnInit() {
  }

}
