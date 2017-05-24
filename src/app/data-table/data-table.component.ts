import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {AccountMovement} from '../domain/account-movement';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: []
})
export class DataTableComponent implements OnInit {
  private data: AccountMovement[];
  private dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  ngOnInit() {
    this.dataService.subscribe().subscribe((data) => {
      this.data = data;
    });
    this.dataService.subscribe().subscribe(data => console.log(data));
  }

  public getData(): AccountMovement[] {
    return this.data;
  }


}
