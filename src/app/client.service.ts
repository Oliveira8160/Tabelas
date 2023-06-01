import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { client } from './client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }

  getClients () : Observable<client[]>{

    let url = "http://localhost:3000/clients"
    return this.http.get<client[]>(url);
  }
}
