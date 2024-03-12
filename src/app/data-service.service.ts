import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicare } from './medicare';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private httpClient: HttpClient) { }

  isSuccess(){
    console.log(this.httpClient.get<any>('http://localhost:3000/success'));
    return this.httpClient.get<any>('http://localhost:3000/success');
  }
  getData(){
    return this.httpClient.get<Medicare[]>('http://localhost:3000/data');
  }
}
