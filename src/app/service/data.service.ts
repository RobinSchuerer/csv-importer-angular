import {Injectable} from '@angular/core';
import {AccountMovement} from '../domain/account-movement';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class DataService {
  private data = new ReplaySubject<AccountMovement[]>();

  constructor() {
  }

  public setDataSets(movements: AccountMovement[]) {

    this.data.next(movements);
    console.log('updated data' + movements);
  }

  public subscribe() {
    return this.data;
  }

}
