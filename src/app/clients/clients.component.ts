import { Observable } from 'rxjs';
import { client } from '../client';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients : client[] = [];

  constructor (private ClientService : ClientService){}
  ngOnInit(): void {
    this.loadClients();
  }
  loadClients() {
    this.ClientService.getClients().subscribe({

      next : data => this.clients = data

    })
  }

}
