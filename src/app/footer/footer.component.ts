import { Component, OnInit } from '@angular/core';
import { VERSION } from '../../environments/version';
import { Version } from '../version';

@Component({
  selector: 'fp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // public version: string = version;
  public version: Version = VERSION;
  year: Date;

  constructor() {
      this.year = new Date();
  }

  ngOnInit() {
  }

}
