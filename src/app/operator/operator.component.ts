import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TracaService } from '@app/service/traca.service';
import { GroupSubOpe, Operation, Process, SubOperation } from '@app/_interfaces/process';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit, AfterViewInit {

  @Input() scanInput: any;
  process: {
    part: any,
    process: Process,
    prodProcess: any
  };
  lastOpe: {
    opSAP: Operation,
    groupOpe: GroupSubOpe,
    opeDet: SubOperation
  };


  constructor(private tracaService: TracaService) { }
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
      console.log(res.process.prodProcess.DATE_DEBUT);
      if (res.process.prodProcess.DATE_DEBUT == null) {
        //Débuter le process et la première opération
        this.tracaService.launchOperation(res.process.LISTE_OPERATIONS[0], res.process.prodProcess).subscribe(res => {
          console.log(res);
        });
        console.log("Je défini la dernière OP sur la première OP");
        this.lastOpe = {
          opSAP: res.process.LISTE_OPERATIONS[0],
          groupOpe: res.process.LISTE_OPERATIONS[0]['OPERATION_GROUP'][0],
          opeDet: res.process.LISTE_OPERATIONS[0]['OPERATION_GROUP'][0]['OPERATIONS_DETAILLEES'][0]
        }
        console.log(this.lastOpe);
      } else {
        console.log("Je défini la dernière op non réalisée");
        for (const operation of res.process.LISTE_OPERATIONS) {
          console.log(1);
          if (this.lastOpe) break;
          for (const groupOpe of operation.OPERATION_GROUP) {
            console.log(2);
            if (this.lastOpe) break;
            for (const opeDet of groupOpe.OPERATIONS_DETAILLEES) {
              console.log(3);
              if (this.lastOpe) break;
              console.log(opeDet.prodSubOperation.DATE_FIN);
              if (opeDet.prodSubOperation.DATE_FIN == null) {
                this.lastOpe = {
                  opSAP: operation,
                  groupOpe: groupOpe,
                  opeDet: opeDet
                }
                break;
              }
            }
          };
        }
      }
    });
  }
}
