import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {

  @Input() paginator: any;
  private pages: number[];
  constructor() { }

  ngOnInit() {
    console.log(this.paginator.totalPages);
    this.pages = new Array(this.paginator.totalPages).fill(0).map((value, index) => index + 1);
    console.log(this.pages );
  }

}
