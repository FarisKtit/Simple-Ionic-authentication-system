import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

let baseURI = 'http://localhost:8888/Auth/app/api/';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  post_data(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      let URI = baseURI + type;
      this.http.post(URI, JSON.stringify(credentials), {headers: headers}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    })
  }

}
