import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client;
  disableBalanceOnAdd: boolean;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public clientService: ClientService,
    public settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.client = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: '0.00'
    };
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (valid) {
      if (this.disableBalanceOnAdd) {
        value.balance = '0';
      }
      this.clientService.newClient(value);
      this.flashMessagesService.show('Client Added', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    } else {
      console.log('Client Not Valid!');
      this.flashMessagesService.show('Please check form data, Client data is invalid.',
        {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['add-client']);
    }
  }
}
