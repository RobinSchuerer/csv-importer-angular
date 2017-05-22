import {Injectable} from '@angular/core';
import {AccountMovement} from '../domain/account-movement';

@Injectable()
export class DataService {

  private _data: AccountMovement[];

  constructor() {
  }

  public setDataSets(movements: AccountMovement[]) {
    this._data = movements;
  }


  get data(): AccountMovement[] {
    return this._data;
  }
}
