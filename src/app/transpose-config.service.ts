import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransposeConfigService {

  constructor(private http: HttpClient) { }

  getConfig(){
    return this.http.get<any>('http://localhost:5000/config');
  }

  getData(){
    return this.http.get<any>('http://localhost:8000/data');
  }
}
