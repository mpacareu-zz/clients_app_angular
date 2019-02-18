import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  client: Client;
  title: String = 'Client Detail';
  private selectedPhoto: File;
  progress: number;

  constructor( private clientService: ClientService, private activatedRout: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRout.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
         this.clientService.getClient(id).subscribe(c => {
          this.client = c;
        });
      }
    });
  }

  selectPhoto( event) {
    this.selectedPhoto = event.target.files[0];
    this.progress = 0;
    console.log(this.selectedPhoto);
    if (this.selectedPhoto.type.indexOf('image') < 0) {
      swal.fire('Error: invalid image format', 'You must select a valid image format', 'error'); 
      this.selectedPhoto =  null;
    }
  }

  uploadPhoto() {
    if(!this.selectedPhoto){
      swal.fire('Error Upload', 'You must select an image', 'error');
    }
    else {
    this.clientService.uploadPhoto(this.selectedPhoto, this.client.id).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(event.loaded / event.total * 100);
      }
      else if(event.type === HttpEventType.Response){
        let response: any = event.body;
        this.client = response.client as Client;
        swal.fire('The photo was uploaded!', response.message, 'success');
      }
    });
  }
  }

}
