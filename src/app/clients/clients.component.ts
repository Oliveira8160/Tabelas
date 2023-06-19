import { Observable } from 'rxjs';
import { client } from '../client';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients : client[] = [];
  client : client = {} as client;
  isEditing : boolean = false;


  constructor (private ClientService : ClientService){}


  ngOnInit(): void {
    this.loadClients();
  }
  loadClients() {
    this.ClientService.getClients().subscribe({

      next : data => this.clients = data

    })
  }

  onSaveEvent(client : client){

      if(this.isEditing){

        this.ClientService.update(client).subscribe
        ({
          next : () => {
            this.loadClients();
            this.isEditing = false;
          }

        })

      }

      else
      {
        this.ClientService.save(client).subscribe
            ({
                next : data => {
                  this.clients.push(data)
                }
            })
      }

    }


  edit(client : client){
    this.client = client;
    this.isEditing = true;
  }
  delete(client : client){
    this.ClientService.delete(client).subscribe
    ({
      next : () => this.loadClients()
    })
  }





}
