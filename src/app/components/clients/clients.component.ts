import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;
  constructor(public clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });

  }

  getTotalOwed() {
    let total = 0.0;
    for (const client of this.clients) {
      total += parseFloat(client.balance);
    }
    this.totalOwed = total;
    console.log(this.totalOwed);
  }
}
