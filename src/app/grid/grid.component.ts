import { OnInit } from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef,ColGroupDef } from 'ag-grid-community';
import * as Highcharts from 'highcharts'
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

}

