import { Component, OnInit } from '@angular/core';
import { ApexGrid, ColumnConfiguration } from 'apex-grid';
import { CarService } from '../car.service';
import { DataServiceService } from '../data-service.service';
import { Medicare } from '../medicare';

ApexGrid.register();

@Component({
  selector: 'app-apex',
  templateUrl: './apex.component.html',
  styleUrl: './apex.component.scss'
})
export class ApexComponent implements OnInit {

  data: any[] = [];

  columns: ColumnConfiguration<Medicare>[];

  constructor(private service: DataServiceService) { };

  ngOnInit() {
    this.service.getData().subscribe((e) => {
      e.map((d) => {
        this.data.push({
          Medicare_Part: d["Medicare Part"],
          Case_Type: d["Case Type"],
          Case_Status: d["Case Status"],
          Case_id: d["Case Id"],
          TAT_in_days: d["TAT in Days"],
          No_of_open_cases: d["No of Open Cases"]
        })
      })
      console.log(this.data);
      this.columns = [{
        key: "Medicare_Part",
      }, { key: "Case_Status" },
      { key: "Case_Type" }, { key: "Case_id" }, { key: "TAT_in_days" }, { key: "No_of_open_cases" }]
    })
  }

}
