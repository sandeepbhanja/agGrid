import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef, GridApi, GridReadyEvent, GridOptions, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy, SizeColumnsToContentStrategy } from 'ag-grid-community';
import { CarService } from '../car.service';
import { Car } from '../car';
import { LineChartComponent } from '../line-chart/line-chart.component';

@Component({
  selector: 'app-cross-tab1',
  templateUrl: './cross-tab1.component.html',
  styleUrl: './cross-tab1.component.scss'
})
export class CrossTab1Component implements AfterViewInit {

  rowData: any = [];
  colData: (ColDef | ColGroupDef)[] = [
    {field:'country', rowGroup:true, filter:true},
    { field: 'athlete', rowGroup:true, filter: true },
    { field: 'sport', filter: true,pivot:true },
    { field: 'year', pivot: true, filter: true },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },];
  gridApi!: GridApi;

  gridOptions: GridOptions = {};

  public groupDefaultExpanded = -1;
  public pivotDefaultExpanded = -1;

  public autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
    columnLimits: [
      {
        colId: 'country',
        minWidth: 900,
      },
    ],
  };
  

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }

  constructor(private carService: CarService) { }

  ngAfterViewInit(): void {
    this.carService.getAllCars().subscribe((e) => {
      this.rowData = e
      this.gridApi.expandAll();
      this.gridApi.setGridOption("rowData", this.rowData)
    });
    // this.carService.getAllCars().subscribe((e) => {
    //   this.colData.push({ headerName: "Color", field: "Color", cellStyle: { textAlign: "center" } });
    //   e.map((data) => {
    //     if (this.colData) {
    //       let a = this.colData.findIndex(c => c.headerName === data.Company)
    //       let b = this.rowData.findIndex(c => c.Color === data.Color);
    //       if (b == -1) {
    //         if (a == -1) {
    //           this.colData.push({ headerName: data.Company, children: [{ field: data.Model }] });
    //           this.rowData.push({ "Color": data.Color, [data.Model]: data.Price });
    //         }
    //         else {
    //           (this.colData[a] as ColGroupDef<any>).children.push({ field: data.Model });
    //           this.rowData.push({ "Color": data.Color, [data.Model]: data.Price });
    //         }
    //       }
    //       else {
    //         if (a != -1) {
    //           (this.colData[a] as ColGroupDef<any>).children.push({ field: data.Model });
    //           this.rowData[b] = { ...this.rowData[b], [data.Model]: data.Price };
    //         }
    //         else {
    //           this.colData.push({ headerName: data.Company, children: [{ field: data.Model }] });
    //           this.rowData.push({ "Color": data.Color, [data.Model]: data.Price });
    //         }
    //       }
    //     }
    //     this.gridApi.setGridOption('columnDefs', this.colData);
    //     this.gridApi.setGridOption('rowData', this.rowData);
    //   })
    // }
    // )
  }
}
