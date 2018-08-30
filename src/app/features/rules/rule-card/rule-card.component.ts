import {Component, Input, OnInit} from '@angular/core';
import {Rule} from "../rule";

@Component({
  selector: 'fp-rule-card',
  templateUrl: './rule-card.component.html',
  styleUrls: ['./rule-card.component.scss']
})
export class RuleCardComponent {
  @Input() rule: Rule;
  // @Input() frontTitle: string;
  // @Input() rearTitle: string;
  // @Input() frontImageClass: string;
  // @Input() rearImageClass: string;
  // @Input() frontDescription: string;
  // @Input() rearDescription: string;
}
