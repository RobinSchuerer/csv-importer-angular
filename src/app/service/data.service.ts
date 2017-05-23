import {Injectable} from '@angular/core';
import {AccountMovement} from '../domain/account-movement';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class DataService {
  private _data: AccountMovement[];

  private data = new ReplaySubject<AccountMovement[]>();

  constructor() {
  }

  public setDataSets(movements: AccountMovement[]) {

    this.data.next(movements);
    this._data = movements;
    console.log('updated data' + movements);
  }

  public subscribe(observer: any) {
    this.data.subscribe(observer);
  }

  public getData(): AccountMovement[] {
    return this._data;
  }

}
