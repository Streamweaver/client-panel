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
  }

  getSettings(): Settings {
    return this.settings;
  }
}
