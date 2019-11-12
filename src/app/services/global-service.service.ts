import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  public _token: string;
  public _idUser: number;

  constructor() { }

  get idUser() {
    return this._idUser;
  }

  set idUser(idUser: number) {
    this._idUser = idUser;
  }

  get token() {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }
}
