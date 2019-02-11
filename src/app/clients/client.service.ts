import { Injectable } from '@angular/core';
import { Client } from './client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class ClientService {
  private urlEndPoint = 'http://localhost:8081/api/clients';
  private httpHeadders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) { }

  getClients(): Observable<Client[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Client[])
    );
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, {headers: this.httpHeadders}).pipe(
      catchError( e => {
        swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
}

  getClient(id): Observable <Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update (client: Client): Observable <Client> {
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeadders}).pipe(
      catchError( e => {
        swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeadders}).pipe(
      catchError( e => {
        swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
