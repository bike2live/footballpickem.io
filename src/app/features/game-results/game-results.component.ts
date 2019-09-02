import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { Game } from '../game';
import { GameResults } from '../game-results';

@Component({
  selector: 'fp-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent implements OnInit {
  game: Game;
  gameResults: GameResults[];

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.game = this.route.snapshot.data['game'];
    this.gameResults = this.route.snapshot.data['gameResults'];
    if (!this.isGamePast(this.game)) {
      this.router.navigate(['/schedule']);
    }
  }

  isGamePast(game: Game): boolean {
    return new Date() > new Date(Date.parse(game.gameDate));
  }
}
