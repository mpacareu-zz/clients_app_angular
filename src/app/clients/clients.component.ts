import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  paginator: any;

  constructor(private clientService: ClientService, private ativatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ativatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page') ? +params.get('page') : 0;

      this.clientService.getClients(page).subscribe( response => {
        console.log(response);
        this.clients = response.content;
        this.paginator = response;
      });
    });
  }

  delete(client: Client): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete ${client.name} ${client.lastName} client?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clientService.delete(client.id).subscribe(response => {
          this.clients = this.clients.filter(c => c !== client);
          swalWithBootstrapButtons.fire(
            'Client Deleted!',
            `${client.name} client has been deleted with succes!.`,
            'success'
          );
        });
      }
    });
  }
}
