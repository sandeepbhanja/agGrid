import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  getAllCars(){
    // console.log(this.http.get<any[]>('https://dummyjson.com/products'));
    return this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-olympic-winners.json');
    // return this.http.get<any[]>('https://dummyjson.com/products');
  }
}
