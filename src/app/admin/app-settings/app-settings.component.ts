import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../core/data.service';
import { AppSetting } from './appSetting';

@Component({
  selector: 'fp-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {
  appSettings$: Observable<AppSetting[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log('getting appSettings');
    this.appSettings$ = this.dataService.getAppSettings();
  }

}
