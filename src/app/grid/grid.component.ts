import { AfterViewInit, Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { CarService } from '../car.service';
import { Car } from '../car';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements AfterViewInit {

  rowData: any[];
  colDef: ColDef[] = [];
  gridApi!: GridApi<Car>;
  constructor(private carService: CarService) { }
  onGridReady(params: GridReadyEvent<Car>) {
    this.gridApi = params.api; // Access GridApi here when grid is ready
  }
  ngAfterViewInit(): void {
    this.carService.getAllCars().subscribe((e) => {
      this.rowData = e;
      let keys = Object.keys(this.rowData[0]);
      keys.forEach((key) => {
        this.colDef.push({ field: key, filter: true });
      });
      this.gridApi.setGridOption("columnDefs", this.colDef);
    })
  }
}

