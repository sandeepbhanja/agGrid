import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrl: './highchart.component.scss'
})
export class HighchartComponent implements AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart:{
      type:'column',
    },
    title:{
      text:'Column Chart'
    },
    yAxis:{
      min:0,
      max:200,
      title:{
        text:'Y-axis'
      }
    }
  };
  constructor(private dataService: DataServiceService) { }
  rowData: any[];
  @ViewChild(HighchartsChartComponent, { static: false }) chartComponent: HighchartsChartComponent;
  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.dataService.getData().subscribe(data => {
      function cmp(a, b) {
        return a._xAxis_sortBy_id_ - b._xAxis_sortBy_id_;
      }
      this.rowData = data;
      this.rowData.sort(cmp);
      let catergory = [];
      let keys = Object.keys(this.rowData[0]);
      let xAxis = keys[0];
      let yAxis1 = keys[2];
      let yAxis2 = keys[3];
      let data1 = { name: "", data: [] };
      let data2 = { name: "", data: [] };
      this.rowData.map((d) => {
        catergory.push(d[xAxis]);
        data1.name = yAxis1;
        data1.data.push(d[yAxis1]);
        data2.name = yAxis2;
        data2.data.push(d[yAxis2]);
      });
      console.log(catergory);

      let series1: Highcharts.SeriesOptionsType = {
        name: data1.name,
        type: 'column', // Adjust the type as needed
        data: data1.data
      };

      let series2: Highcharts.SeriesOptionsType = {
        name: data2.name,
        type: 'column', // Adjust the type as needed
        data: data2.data
      }

      this.chartOptions.xAxis = { categories: catergory };
      this.chartOptions.series = [series1, series2];
      console.log(this.chartOptions);
      this.chartComponent.updateOrCreateChart();
    })
  }
}
