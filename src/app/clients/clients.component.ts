import { Observable } from 'rxjs';
import { Client } from '../client';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients : Client[] = [];
  client : Client = {} as Client;
  isEditing : boolean = false;

  constructor (private ClientService : ClientService,
    ){

    }
  ngOnInit(): void {
    this.loadClients();
  }
  loadClients() {
    this.ClientService.getClients().subscribe({

      next : data => this.clients = data

    })
  }

  onSaveEvent(){

      if(this.isEditing){

        this.ClientService.update(this.client).subscribe
        ({

          next : () => {
            this.loadClients();
            this.isEditing = false;
          }

        })

      }
      else
      {
        this.ClientService.save(this.client).subscribe
            ({
                next : data => {
                  this.clients.push(data)
                }
            })
      }

    }


  edit(client : Client){
    this.client = client;
    this.isEditing = true;
  }
  delete(client : Client){
    this.ClientService.delete(client).subscribe
    ({
      next : () => this.loadClients()
    })
  }

}
