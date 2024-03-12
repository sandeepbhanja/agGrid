import { AfterViewInit, Component } from '@angular/core';
import { TransposeConfigService } from '../transpose-config.service';
import { ColDef, ColGroupDef, GridApi, GridReadyEvent, GridOptions, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy, SizeColumnsToContentStrategy, SortDirection } from 'ag-grid-community';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-row-transpose',
  templateUrl: './row-transpose.component.html',
  styleUrl: './row-transpose.component.scss'
})
export class RowTransposeComponent implements AfterViewInit {

  rowData$!: Observable<any[]>;
  colData: ColDef[] = [];
  gridApi!: GridApi;
  config: any;
  tempData: any[] = [];
  rowData: any[] = [];
  nodeLevel0$!: Observable<any[]>;
  supressRowClick = true;


  statusBar = {
    statusPanels: [{
      statusPanel: 'agAggregationComponent',
      statusPanelParams: {
        aggFuncs: ['avg', 'sum']
      }
    }]
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    if (this.config['autoWidth']) {
      this.gridApi.sizeColumnsToFit();
    }
    // this.gridApi.setGridOption('rowData', this.rowData);
  }

  setAgg(agg: string) {
    switch (agg) {
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
      case "DISTINCT COUNT":
        return "distinctCount";
      case "Standard deviation":
        return "STD";
      case "Variance":
        return "variance";
      default: return null;
    }
  }

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
        return "datestring";
      default:
        return "text";
    }
  }

  constructor(private transposeService: TransposeConfigService) {

  }

  suppressAggFuncInHeader = true;

  ngAfterViewInit(): void {
    this.rowData$ = this.transposeService.getData().pipe();
    this.rowData$.subscribe(data => this.rowData = data);
    this.transposeService.getConfig().subscribe((e) => {
      this.config = e;
      // if (e['rowTranspose']) {
      //   this.RowTranspose();
      // }
      // else {
      this.Grid();
      // }
    });
  }

  // RowTranspose() {
  //   this.colData = [];
  //   this.colData = [{ field: "Col0", headerName: " " }, ...this.colData];
  //   let col = [];
  //   let aggFunctions = [];
  //   this.config['ValueAreaDetails'].map((data)=>{
  //     aggFunctions = [data.summaryAggregation, ...aggFunctions];
  //   })
  //   console.log(aggFunctions);
  //   this.config['RowAreaDetails'].map((data: any) => {
  //     col = [{ name: data.member }, ...col];
  //   })
  //   let i = 0;
  //   col.map((e) => {
  //     this.rowData.map((data) => {
  //       if (this.colData.findIndex((d) => d.field === data[e.name]) == -1) {
  //         this.colData.push({ field: data[e.name], headerName: data[e.name] });
  //       }
  //     })
  //   })
  //   this.gridApi.setGridOption('columnDefs', this.colData);
  // }

  Grid() {
    this.colData = [];
    this.config['ValueAreaDetails'].map((data: any) => {
      this.colData.push({
        headerName: data.displayName,
        field: data.member,
        hide: data.hidden,
        sortable: data.soratble,
        aggFunc: this.setAgg(data.summaryAggregation),
        width: data['width'],
        resizable: false,
        valueFormatter: params => {
          if (params.value === undefined) {
            return data.nullValueAs;
          }
          else {
            return Number(params.value).toFixed(2)
          }
        },
      });
    })

    this.config['RowAreaDetails'].map((data: any) => {
      this.colData.push({
        headerName: data.displayName,
        field: data.member,
        hide: true,
        showRowGroup: data.displayName,
        sortable: data.soratble,
        width: data['width'],
        rowGroup: true,
        resizable: false,
        enableRowGroup: false,
        valueFormatter: params => {
          if (params.value === undefined) {
            return data.nullValueAs;
          }
        }
      });
    })
    this.gridApi.setGridOption('columnDefs', this.colData);
    this.gridApi.setGridOption("rowData", this.rowData);
  }
}
