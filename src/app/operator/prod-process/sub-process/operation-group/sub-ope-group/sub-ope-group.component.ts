import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProdProcessServiceService } from '@app/service/prod-process-service.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-sub-ope-group',
  templateUrl: './sub-ope-group.component.html',
  styleUrls: ['./sub-ope-group.component.css']
})
export class SubOpeGroupComponent implements OnInit, OnChanges {
  isTraca: boolean;
  tracaStatus: string;
  @Input() subOperation: any;
  @Input() prodProcessSubOpe: any;
  subOpeProdStatus: any;
  subOpeTracaStatus: any;
  @Input() active: boolean;
  constructor(private prodProcessServiceService: ProdProcessServiceService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("change data subOpeGroup", changes, this.subOpeProdStatus, this.subOperation);
    if (changes.prodProcessSubOpe) {
      //PROD STATUS
      (this.subOperation.prodSubOperation.DATE_FIN) ? this.subOpeProdStatus = '1' : this.subOpeProdStatus = '4';
      this.isTraca = this.isAnyTraca();
      if (this.isTraca) {
        this.tracaStatus = this.getTracaStatus();
        console.log(this.tracaStatus);
      }
    }
  }

  ngOnInit(): void {

  }

  isAnyTraca(): boolean {
    for (const step of this.subOperation.STEPS) {
      if (step.TRACA) {
        return true;
      } else {
        return false;
      }
    }
  }

  getTracaStatus(): string {
    for (const step of this.subOperation.STEPS) {
      console.log(step.TRACA);
      if (step.TRACA) {
        console.log(step.TRACA.prodTraca);
        if (step.TRACA.prodTraca) {
          let score: number = 0;
          step.TRACA.TRACA_DETAILS.forEach(tracaDetailElement => {
            score = score + Number.parseInt(tracaDetailElement.prodTracaDetail.SANCTION);
          });
          console.log(score);
          if (score < step.TRACA.TRACA_DETAILS.length) {
            return '3';
          } else {
            if (score == step.TRACA.TRACA_DETAILS.length) {
              return '1';
            }
          }
        }
      }
    }
  }
}
