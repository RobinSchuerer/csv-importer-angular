import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {AccountMovement} from '../domain/account-movement';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [DataService]
})
export class DataTableComponent implements OnInit {
  private data: AccountMovement[];

  constructor(private dataService: DataService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataService.subscribe((data) => {

      this.data = data;
      this.changeDetector.detectChanges();
    });
    this.dataService.subscribe(data => data.log());
  }

  public getData(): AccountMovement[]{
    return this.dataService.getData();;
  }


}
