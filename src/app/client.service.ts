import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { client } from './client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = "http://localhost:3000/clients"

  constructor(private http : HttpClient) { }

  getClients () : Observable<client[]>{


    return this.http.get<client[]>(this.url);
  }

  save(client : client) : Observable<client>{

    return this.http.post<client>(this.url, client);

  }
}
