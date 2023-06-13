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
  formGroupClient : FormGroup;
  isEditing : boolean = false;
  submitted : boolean = false;

  constructor (private ClientService : ClientService,
               private formBuilder : FormBuilder
    ){

      this.formGroupClient = formBuilder.group({

        id : [''],
        Primeiro_nome : ['', [Validators.required]],
        Segundo_nome : ['', [Validators.required]],
        email : ['', [Validators.email]],
        telefone : ['', [Validators.required]]
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
    this.submitted = true;

    if(this.formGroupClient.valid){

      if(this.isEditing){

        this.ClientService.update(this.formGroupClient.value).subscribe
        ({

          next : () => {
            this.loadClients();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.submitted = false;
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
                  this.submitted = false;
                }
            })
      }

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
    this.isEditing = false;
    this.submitted = false;
  }

  get Primeiro_nome() : any {
    return this.formGroupClient.get("Primeiro_nome");
  }
  get Segundo_nome() : any {
    return this.formGroupClient.get("Segundo_nome");
  }
  get email() : any {
    return this.formGroupClient.get("email");
  }
  get telefone() : any {
    return this.formGroupClient.get("telefone");
  }

}
