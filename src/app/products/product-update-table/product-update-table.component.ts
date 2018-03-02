import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Update } from '../product.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-product-update-table',
  templateUrl: './product-update-table.component.html',
  styleUrls: ['./product-update-table.component.css']
})
export class ProductUpdateTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() updates$: Observable<Update[]>;
  dataSource: MatTableDataSource<Update> = new MatTableDataSource();
  columnsToDisplay = ['createdAt', 'price', 'isAvailable'];
  @ViewChild(MatSort) sort: MatSort;
  onDestroy = new Subject<boolean>();


  constructor() {
  }

  ngOnInit() {
    this.updates$.pipe(
      tap(updates => this.dataSource.data = updates),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // this.dataSource.sortingDataAccessor = (update, headerId) => update, headerId);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

}
