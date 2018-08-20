import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = `Byu Football Pick'em 2018`;

  constructor() { }

  ngOnInit() {
  }

}
