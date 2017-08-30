import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';

@Injectable()
export class SettingsService {
  settings: Settings;

  constructor() {
    this.settings = {
      allowRegistration: false,
      disableBalanceOnAdd: true,
      disableBalanceOnEdit: true
    };
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings) {
    this.settings = settings;
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
