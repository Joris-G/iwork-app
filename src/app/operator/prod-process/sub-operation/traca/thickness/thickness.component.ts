import { Component, Input, OnInit } from '@angular/core';
import { TracaService } from '@app/service/traca.service';

@Component({
  selector: 'app-thickness',
  templateUrl: './thickness.component.html',
  styleUrls: ['./thickness.component.css']
})
export class ThicknessComponent implements OnInit {
  @Input() tracas: any;
  @Input() subOperation: any;
  previousDatas: any[];
  selectedPreviousDatas: any = [];

  constructor(private tracaService: TracaService) { }

  ngOnInit(): void {
    console.log(this.tracas);
    console.log(this.subOperation);
    this.getAllPreviousDatas(this.tracas.ID_TRACA);
  }
  getAllPreviousDatas(idTraca: number) {
    this.tracaService.getPreviousTraca(idTraca).subscribe((res: any) => {
      console.log(res);
      this.previousDatas = res;
    });
  }
  getSelectedPointPreviousDatas(idPoint: string) {
    this.selectedPreviousDatas = [];
    this.previousDatas.forEach(previousData => {
      console.log(previousData);
      const previousPointMeasure = previousData.DATAS.filter(data => data.ID_TRACA_MESURE == idPoint);
      this.selectedPreviousDatas.push({ mesure: previousPointMeasure[0], part: previousData.ORDRE_FABRICATION });
    });
  }
  selectPoint(event: HTMLElement) {
    this.getSelectedPointPreviousDatas(event.parentElement.id)
  }
}
