import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class ClientService {
  private urlEndPoint: string = 'http://localhost:8080/api/clients';
  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Client[])
    );
  }

}
