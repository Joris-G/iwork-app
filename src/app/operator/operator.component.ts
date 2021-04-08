import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  @Input() scanInput: any;
  process: any;
  lastOpe: any;
  constructor() { }

  ngOnInit(): void {
    document.getElementById('operator').onclick = () => {
      this.process = null;
    };

  }

  getScanedInput(input: Observable<any>) {
    input.subscribe(res => {
      this.process = res;
      console.log(res);
      for (const operation of res.process.LISTE_OPERATIONS) {
        if (this.lastOpe) break;
        for (const groupOpe of operation.OPERATION_GROUP) {
          if (this.lastOpe) break;
          for (const opeDet of groupOpe.OPERATIONS_DETAILLEES) {
            if (this.lastOpe) break;
            if (opeDet.PROD.STATUS == 0 || opeDet.PROD == undefined) {
              this.lastOpe = {
                opSAP: operation,
                groupOpe: groupOpe,
                opeDet: opeDet
              }
            }
          }
        };
      }
    });
  }
}
