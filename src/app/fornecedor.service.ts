import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fornecedor } from './fornecedor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  url = "http://localhost:3000/fornecedores"

  constructor(private http : HttpClient) { }

  getFornecedores () : Observable<fornecedor[]>{


    return this.http.get<fornecedor[]>(this.url);
  }

  save(fornecedor : fornecedor) : Observable<fornecedor>{
    return this.http.post<fornecedor>(this.url, fornecedor);
  }
  update(fornecedor : fornecedor) : Observable<fornecedor>{
    return this.http.put<fornecedor>(`${this.url}/${fornecedor.id}`, fornecedor);
  }
  delete(fornecedor : fornecedor) : Observable<void>{

    return this.http.delete<void>(this.url + "/" + fornecedor.id);

    // OU

    //return this.http.delete<void>(`${this.url}/${client.id}`);
  }

}
