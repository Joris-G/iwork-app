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
    console.log("change data subOpeGroup", changes, this.subOpeProdStatus);
    if (changes.prodProcessSubOpe) {
      (this.subOperation.prodSubOperation.DATE_FIN) ? this.subOpeProdStatus = '1' : this.subOpeProdStatus = '4';
      this.isAnyTraca();
      if (this.isTraca) {
        this.getTracaStatus();
      }
    }
    //console.log("subOpe groupe");
    for (const key in changes) {
      //console.log(key, "à changé");
      //console.log(changes[key]);

    }
  }

  ngOnInit(): void {

  }

  isAnyTraca() {

    for (const step of this.subOperation.STEPS) {
      if (step.TRACA) {
        this.isTraca = true
      } else {
        this.isTraca = false;
      }
    }
  }

  getTracaStatus() {
    for (const step of this.subOperation.STEPS) {
      if (step.TRACA) {
        if (step.TRACA.PROD_TRACA_DETAILS) {
          if (step.TRACA.PROD_TRACA_DETAILS.SANCTION == '1') {
            this.tracaStatus = '2';
            return;
          } else {
            this.tracaStatus = '3';
            return;
          }
        } else {
          this.tracaStatus = '4';
          return
        }
      }
    }
  }
}
