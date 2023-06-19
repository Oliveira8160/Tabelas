import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {

  formGroupClient : FormGroup;
  submitted : boolean = false;

  constructor (private formBuilder : FormBuilder
  ){

    this.formGroupClient = formBuilder.group({

      id : [''],
      Primeiro_nome : ['', [Validators.required]],
      Segundo_nome : ['', [Validators.required]],
      email : ['', [Validators.email]],
      telefone : ['', [Validators.required]]
    })

  }

  save(){
    
  }
  recarregar()
  {
    this.formGroupClient.reset();
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
