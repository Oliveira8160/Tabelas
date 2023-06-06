import { Observable } from 'rxjs';
import { client } from '../client';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients : client[] = [];
  formGroupClient : FormGroup;
  isEditing : boolean = false;

  constructor (private ClientService : ClientService,
               private formBuilder : FormBuilder
    ){

      this.formGroupClient = formBuilder.group({

        id : [''],
        nome : [''],
        email : [''],
        telefone : ['']
      })

    }
  ngOnInit(): void {
    this.loadClients();
  }
  loadClients() {
    this.ClientService.getClients().subscribe({

      next : data => this.clients = data

    })
  }

  save(){
    if(this.isEditing){

      this.ClientService.update(this.formGroupClient.value).subscribe
      ({

        next : () => {
          this.loadClients();
          this.formGroupClient.reset();
          this.isEditing = false;
        }

      })

    }
    else
    {
      this.ClientService.save(this.formGroupClient.value).subscribe
          ({
              next : data => {
                this.clients.push(data)
                this.formGroupClient.reset()
              }
          })
    }
  }

  edit(client : client){
    this.formGroupClient.setValue(client);
    this.isEditing = true;
  }
  delete(client : client){
    this.ClientService.delete(client).subscribe
    ({
      next : () => this.loadClients()
    })
  }

  recarregar()
  {
    this.formGroupClient.reset();
  }

}
