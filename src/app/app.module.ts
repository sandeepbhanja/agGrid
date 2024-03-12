import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { CrossTab1Component } from './cross-tab1/cross-tab1.component';
import { CrossTab2Component } from './cross-tab2/cross-tab2.component';
import { HttpClientModule } from '@angular/common/http';

import 'ag-grid-enterprise';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { AgChartsAngular, AgChartsAngularModule } from 'ag-charts-angular';
import { HighchartComponent } from './highchart/highchart.component';
import { ApexComponent } from './apex/apex.component';
import { RowTransposeComponent } from './row-transpose/row-transpose.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CrossTab1Component,
    CrossTab2Component,
    LineChartComponent,
    ColumnChartComponent,
    HighchartComponent,
    ApexComponent,
    RowTransposeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridAngular,
    AgGridModule,
    HttpClientModule,
    HighchartsChartModule,
    AgChartsAngularModule,
    AgChartsAngular,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
