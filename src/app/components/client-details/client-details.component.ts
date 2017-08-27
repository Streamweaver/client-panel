import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean;
  showBalanceUpdateInput: boolean;

  constructor(
    public clientService: ClientService,
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.hasBalance = false;
    this.showBalanceUpdateInput = false;

    // Get ID from URL
    this.id = this.route.snapshot.params['id']; // grabs this from URL.

    // Get The client and assign it to this.client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      if (parseFloat(this.client.balance) > 0) {
        this.hasBalance = true;
      }
    });
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.showBalanceUpdateInput = false;
    this.flashMessagesService.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 });
  }

  onDeleteClick() {
    if (confirm('Confirm Delete?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }
}
