import { Observable } from 'rxjs';
import { fornecedor } from '../fornecedor';
import { FornecedorService } from './../fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit{

  fornecedores : fornecedor[] = [];
  formGroupFornecedor : FormGroup;
  isEditing : boolean = false;
  submitted : boolean = false;

  constructor (private FornecedorService : FornecedorService,
               private formBuilder : FormBuilder
    ){

      this.formGroupFornecedor = formBuilder.group({

        id : [''],
        nome : ['', [Validators.required]],
        cnpj : ['' ,[Validators.required]],
        telefone : ['', [Validators.required]]
      })

    }
  ngOnInit(): void {
    this.loadFornecedor();
  }
  loadFornecedor() {
    this.FornecedorService.getFornecedores().subscribe({

      next : data => this.fornecedores = data

    })
  }

  save(){
    this.submitted = true;

    if(this.formGroupFornecedor.valid)
    {

      if(this.isEditing){

        this.FornecedorService.update(this.formGroupFornecedor.value).subscribe
        ({

          next : () => {
            this.loadFornecedor();
            this.formGroupFornecedor.reset();
            this.isEditing = false;
            this.submitted = false;
          }

        })

      }
      else
      {
        this.FornecedorService.save(this.formGroupFornecedor.value).subscribe
            ({
                next : data => {
                  this.fornecedores.push(data)
                  this.formGroupFornecedor.reset()
                  this.submitted = false;
                }
            })
      }

    }


  }

  edit(fornecedor : fornecedor){
    this.formGroupFornecedor.setValue(fornecedor);
    this.isEditing = true;
  }
  delete(fornecedor : fornecedor){
    this.FornecedorService.delete(fornecedor).subscribe
    ({
      next : () => this.loadFornecedor()
    })
  }

  recarregar()
  {
    this.formGroupFornecedor.reset();
  }

  get nome() : any {
    return this.formGroupFornecedor.get("nome");
  }
  get cnpj() : any {
    return this.formGroupFornecedor.get("cnpj");
  }
  get telefone() : any {
    return this.formGroupFornecedor.get("telefone");
  }

}
