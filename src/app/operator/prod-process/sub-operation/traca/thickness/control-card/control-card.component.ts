import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-control-card',
  templateUrl: './control-card.component.html',
  styleUrls: ['./control-card.component.css']
})
export class ControlCardComponent implements OnInit {

  _previousDatas: any = [];

  @Input() set previousDatas(value: any) {
    this._previousDatas = value;
    console.log(this._previousDatas);
    let points: number[] = [];
    let legend: string[] = [];
    let tolMax: number[] = [];
    let tolMin: number[] = [];
    let label: string;
    this.previousDatas.forEach(data => {
      legend.push(data.part);
      points.push(data.mesure.VALEUR);
      tolMax.push(data.mesure.DEF.VAL_MAX);
      tolMin.push(data.mesure.DEF.VAL_MIN);
      label = data.mesure.DEF.NOM_MESURE;
    });
    this.drawControlCard(points, tolMax, tolMin, legend, label);
  }

  get previousDatas(): any {
    return this._previousDatas;
  }
  drawControlCard(points: number[], tolMax: number[], tolMin: number[], legend: string[], label: string) {
    this.lineChartData = [];
    this.lineChartLabels = [];
    this.lineChartData.push(
      { data: points, label: label, lineTension: 0 },
      { data: tolMax, label: 'Tolérance Max', pointStyle: 'line' },
      { data: tolMin, label: 'Tolérance Min', pointStyle: 'line' });
    this.lineChartLabels = legend;
  }


  lineChartData: ChartDataSets[] = [

  ];

  lineChartLabels: Label[] = [];

  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Carte de controle'
      }
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,255,0)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,255,255,0)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,255,255,0)',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor() { }

  ngOnInit(): void {
  }

}
