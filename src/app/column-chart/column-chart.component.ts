import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { AgChartsAngular } from "ag-charts-angular";
import { AgBarSeriesOptions, AgChartOptions, AgCharts } from "ag-charts-community";


let myTheme = {
  palette: {
    fills: ["#5C2983", "#0076C5", "#21B372", "#FDDE02", "#F76700", "#D30018"],
    strokes: ["black"],
  },
}

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrl: './column-chart.component.scss'
})

export class ColumnChartComponent implements OnInit {
  constructor(private dataService:DataServiceService){}
  rowData:any[];
  public options: AgChartOptions = {
    theme: myTheme
  };

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      function cmp(a,b){
        return a._xAxis_sortBy_id_ - b._xAxis_sortBy_id_;
      }
      this.rowData = data;
      this.rowData.sort(cmp);
      let key = Object.keys(this.rowData[0]);
      let serie=[];
      let xAxis;
      xAxis = key[0];
      for(let i=2;i<4;i++){
        serie.push({type:"bar",xKey:xAxis,yKey:key[i],yName:key[i]});
      }
      console.log(serie);
      this.options = {
        title:{
          text: 'Column Chart',
        },
        data: this.rowData,
        series: serie,
      }
      
    });
  }

}
