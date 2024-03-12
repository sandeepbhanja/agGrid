import { AfterViewInit, Component } from '@angular/core';
import { ConfigService } from '../config.service';
import { ColDef, ColGroupDef, GridApi, GridReadyEvent, GridOptions, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy, SizeColumnsToContentStrategy, SortDirection } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cross-tab2',
  templateUrl: './cross-tab2.component.html',
  styleUrl: './cross-tab2.component.scss'
})
export class CrossTab2Component implements AfterViewInit {
  constructor(private configService: ConfigService, private http: HttpClient) {

  };
  rowData: any[];
  colData: ColDef[] = [];
  tempCol: ColDef;
  autoWidth: boolean = false;
  temp: ColDef[] = [];
  tempRow: any[] = [];

  gridApi!: GridApi;

  gridOptions: GridOptions = {};

  dataSize: number;

  pagination: boolean = true;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    if (this.autoWidth) {
      this.gridApi.sizeColumnsToFit();
    }
    this.gridApi.setGridOption('rowData', this.rowData);
  }

  transpose() {
    this.temp = [{ headerName: ' ', field: 'Col0' }, ...this.temp];
    this.gridApi.autoSizeColumns(this.temp);
    this.rowData.map((data) => {
      if (this.temp.findIndex((e) => e.headerName === data['Medicare Part']) == -1 && data['Medicare Part'] != undefined) {
        this.temp.push({ headerName: data['Medicare Part'], field: data['Medicare Part'] });
      }
    })
    this.gridApi.setGridOption('columnDefs', this.temp);

    this.configService.getConfig().subscribe((data) => {
      data['ValueAreaDetails'].map((e: any) => {
        let Col0 = e.member;

        this.tempRow = [{ Col0: Col0 }, ...this.tempRow];
      })
      this.gridApi.setGridOption('rowData', this.tempRow);

      this.temp.map((e)=>{
        let a = e.field;
        this.tempRow.map((d)=>{
          if(a!=='Col0'){
            d[a] = 0;
          } 
        })
      })
      do {
          this.tempRow.map((e)=>{
            this.rowData.map((d)=>{
              if(d[e.Col0]==undefined){
                e[d['Medicare Part']] += 0;
              }
              else{
                e[d['Medicare Part']] += d[e.Col0];
              }
            })
          })
      } while (0)
      this.gridApi.setGridOption('rowData', this.tempRow);
      this.gridApi.sizeColumnsToFit();
    })
  };

  setDataType(dataType: string) {
    switch (dataType) {
      case "STRING":
        return "text";
      case "INTEGER":
        return "number";
      case "FLOAT":
        return "number";
      case "DATE":
        return "date";
      case "BOOLEAN":
        return "boolean";
      case "TIMESTAMP":
        return "date";
      default:
        return "text";
    }
  }

  setSort(sort: string) {
    switch (sort) {
      case "ASC":
        return "asc";
      case "DESC":
        return "desc";
      default:
        return null;
    }

  }

  setAggFunc(aggFun: string) {
    switch (aggFun) {
      case "SUM":
        return "sum";
      case "AVG":
        return "avg";
      case "MIN":
        return "min";
      case "MAX":
        return "max";
      case "COUNT":
        return "count";
      default:
        return null;
    }
  }
  ngAfterViewInit(): void {

    this.configService.getData().subscribe((e) => {
      this.rowData = e;
      this.dataSize = e.length;
    })

    this.configService.getConfig().subscribe((e) => {
      if (e['autoWidth'] == true) {
        this.autoWidth = true;
      }

      // this.pagination = e['pagging'];
      e['ValueAreaDetails'].map((d: any) => {
        let cellDataType = this.setDataType(d.type);

        let sortBy: SortDirection = this.setSort(d.SortDirection);

        let aggFn = this.setAggFunc(d.aggregateFn);

        this.tempCol = {
          headerName: d.displayName, field: d.member, sortable: true, cellDataType: cellDataType, hide: d.hidden, aggFunc: aggFn, sort: sortBy,
          valueFormatter: params => {
            if (params.value === undefined) {
              return 0;
            }
            if (typeof (params.value) === 'number') {
              return params.value.toFixed(2)
            } else {
              return params.value;
            }
          }, filter: 'agNumberColumnFilter',
        };
        this.colData = [this.tempCol, ...this.colData];

      });

      e['RowAreaDetails'].map((d: any) => {
        let cellDataType = this.setDataType(d.type);
        let sortBy: SortDirection = this.setSort(d.sortBy);
        this.tempCol = {
          field: d.displayName, sortable: d.soratble, hide: d.hidden, sort: sortBy, cellDataType: cellDataType, valueFormatter: params => {
            if (params.value === undefined) {
              return 0;
            }
            if (typeof (params.value) === 'number') {
              return params.value.toFixed(2)
            } else {
              return params.value;
            }
          }, filter: cellDataType === 'date' ? 'agDateColumnFilter' : 'agTextColumnFilter',
        };
        this.colData = [this.tempCol, ...this.colData];
      });
    });
  }
}