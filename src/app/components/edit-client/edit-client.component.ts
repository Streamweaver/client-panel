import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client;
  disableBalanceOnEdit: boolean;

  constructor(
    public clientService: ClientService,
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.client = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: '0.00'
    };
    // Get The client and assign it to this.client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (valid) {
      if (this.disableBalanceOnEdit) {
        value.balance = '0';
      }
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client Updated', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/client/' + this.id]);
    } else {
      console.log('Client Not Valid!');
      this.flashMessagesService.show('Please check form data, Client data is invalid.',
        {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['edit-client/' + this.id]);
    }
  }
}
