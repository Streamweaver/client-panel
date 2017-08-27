import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/client';

@Injectable()
export class ClientService {
  clients: FirebaseListObservable<Client[]>;
  client: FirebaseObjectObservable<Client>;

  constructor(
    public af: AngularFireDatabase
  ) {
    this.clients = this.af.list('/clients') as FirebaseListObservable<Client[]>;
  }

  getClients() {
    return this.clients;
  }

  getClient(id: string) {
    this.client = this.af.object('/clients/' + id) as FirebaseObjectObservable<Client>;
    return this.client;
  }

  newClient(client: Client) {
    this.clients.push(client);
  }

  updateClient(id: string, client: Client) {
    return this.clients.update(id, client);
  }

  deleteClient(id: string) {
    return this.clients.remove(id);
  }
}