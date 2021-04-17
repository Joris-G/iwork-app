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
  }

  getScanedInput(input: Observable<any>) {
    input.subscribe(resInput => {
      this.process = resInput;
      if (resInput.process.prodProcess.DATE_DEBUT == null) {
        //Débuter le process et la première opération
        console.log("c'est ici qu'on a lancé l'OP");
        this.tracaService.launchOperation(resInput.process.LISTE_OPERATIONS[0], resInput.process.prodProcess).subscribe(res => {
          resInput.process.LISTE_OPERATIONS[0].prodOperation = res;
          this.lastOpe = {
            opSAP: resInput.process.LISTE_OPERATIONS[0],
            groupOpe: resInput.process.LISTE_OPERATIONS[0]['OPERATION_GROUP'][0],
            opeDet: resInput.process.LISTE_OPERATIONS[0]['OPERATION_GROUP'][0]['OPERATIONS_DETAILLEES'][0]
          }

        });
      } else {
        for (const operation of resInput.process.LISTE_OPERATIONS) {
          if (this.lastOpe) break;
          for (const groupOpe of operation.OPERATION_GROUP) {
            if (this.lastOpe) break;
            for (const opeDet of groupOpe.OPERATIONS_DETAILLEES) {
              if (this.lastOpe) break;
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
