import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit, AfterViewInit {

  @Input() scanInput: any;
  process: any;
  lastOpe: any;
  constructor() { }
  ngAfterViewInit(): void {
    // document.getElementById('operator').onclick = () => {
    //   this.process = null;
    //   this.lastOpe = null;
    // };
  }

  ngOnInit(): void {
    console.log('init');


  }


  getScanedInput(input: Observable<any>) {
    input.subscribe(res => {
      this.process = res;
      console.log(res);
      if (!res.prodProcess.DATE_DEBUT) {
        this.lastOpe = {
          opSAP: res.process.LISTE_OPERATIONS[0],
          groupOpe: res.process.LISTE_OPERATIONS[0]['OPERATION_GROUP'][0],
          opeDet: res.process.LISTE_OPERATIONS[0]['OPERATION_GROUP'][0]['OPERATIONS_DETAILLEES'][0]
        }
      }
      // for (const operation of res.prodProcess.LISTE_OPERATIONS) {
      //   if (this.lastOpe) break;
      //   for (const groupOpe of operation.OPERATION_GROUP) {
      //     if (this.lastOpe) break;
      //     for (const opeDet of groupOpe.OPERATIONS_DETAILLEES) {
      //       if (this.lastOpe) break;
      //       console.log(opeDet);
      //       if (opeDet.PROD.STATUS == 0 || opeDet.PROD == undefined) {
      //         this.lastOpe = {
      //           opSAP: operation,
      //           groupOpe: groupOpe,
      //           opeDet: opeDet
      //         }
      //       }
      //     }
      //   };
      // }
    });
  }
}
