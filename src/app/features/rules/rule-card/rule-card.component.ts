import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fp-rule-card',
  templateUrl: './rule-card.component.html',
  styleUrls: ['./rule-card.component.scss']
})
export class RuleCardComponent {
  @Input() frontTitle: string;
  @Input() rearTitle: string;
  @Input() frontImageClass: string;
  @Input() rearImageClass: string;
  @Input() frontDescription: string;
  @Input() rearDescription: string;

}
