import { Component, Input, OnInit } from '@angular/core';
import { ProdProcessServiceService } from '@app/service/prod-process-service.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-sub-ope-group',
  templateUrl: './sub-ope-group.component.html',
  styleUrls: ['./sub-ope-group.component.css']
})
export class SubOpeGroupComponent implements OnInit {
  isTraca: boolean;
  tracaStatus: string;
  @Input() subOperation: any;
  @Input() prodProcessSubOpe: any;
  subOpeProdStatus: any;
  subOpeTracaStatus: any;
  @Input() active: boolean;
  constructor(private prodProcessServiceService: ProdProcessServiceService) { }

  ngOnInit(): void {
    console.log(this.prodProcessSubOpe);
    (this.prodProcessSubOpe) ? this.subOpeProdStatus = this.prodProcessSubOpe.STATUS : this.subOpeProdStatus = false;
    this.isAnyTraca();
    if (this.isTraca) {
      this.getTracaStatus();
    }
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
