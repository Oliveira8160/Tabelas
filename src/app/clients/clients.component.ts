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
    this.ClientService.save(this.formGroupClient.value).subscribe(
      {
        next : data => {
          this.clients.push(data)
          this.formGroupClient.reset()
        }
      }
    )
  }

}
