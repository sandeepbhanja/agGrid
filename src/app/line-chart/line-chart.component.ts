import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit,ICellRendererAngularComp {
  agInit(params: ICellRendererParams<any, any, any>): void {
    
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

  ngOnInit(): void {
    
  }
}
