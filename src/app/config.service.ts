import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getConfig(){
    // console.log(this.http.get<any>('http://localhost:3000/data'));
    return this.http.get<any>('http://localhost:3000/data');
  }

  getData(){
    return this.http.get<any>('http://localhost:8000/data');
  }
}
