import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: Client = new Client();
  private title = 'Create Client';
  constructor( private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.chargeClient();
  }

  public chargeClient(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clientService.getClient(id).subscribe(client => this.client = client);
      }
    });
  }

  public create(): void {
    this.clientService.create(this.client).subscribe(
      client => {
        this.router.navigate(['/clients']);
        swal.fire('New Client',  ` ${client.name} client was created with success!`, 'success');
      }
    );
  }

  update(): void {
    this.clientService.update(this.client).subscribe( client => {
      this.router.navigate(['/clients']);
      swal.fire('Client Updated',  ` ${client.name} client was updated with success!`, 'success');
    }
    );
  }
}
