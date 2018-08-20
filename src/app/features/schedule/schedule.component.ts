import { Component, OnInit } from '@angular/core';

import { DataService } from '../../core/data.service';
import { SessionError } from '../../session-error';
import { User } from '../../users/user';

@Component({
  selector: 'fp-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  private user: User;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSession().subscribe(
      (data: User) => this.user = data,
      (err: SessionError) => console.log(err.friendlyMessage),
      () => console.log('got session')
    );
  }

}
