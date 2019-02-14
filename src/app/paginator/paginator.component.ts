import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginator: any;
  private pages: number[];
  since: number;
  until: number;
  constructor() {}

  ngOnInit() {
    this.updatePaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
     let updatedPaginator = changes ['paginator'];

     if ( updatedPaginator.previousValue) {
       this.updatePaginator();
     }
  }

  private updatePaginator() {
    if (this.paginator.totalPages > 5) {
      this.since = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
      this.until = Math.max (Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);
      this.pages = new Array( this.until - this.since + 1)
      .fill(0)
      .map((value, index) => this.since + index);
    } else {
      this.pages = new Array(this.paginator.totalPages)
      .fill(0)
      .map((value, index) => index + 1);
    }
  }
}
