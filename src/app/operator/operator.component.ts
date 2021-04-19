import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProcessService } from '@app/service/process.service';
import { ProdProcessServiceService } from '@app/service/prod-process-service.service';
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
  process: any;
  lastOpe: {
    opSAP: Operation,
    groupOpe: GroupSubOpe,
    opeDet: SubOperation
  };


  constructor(private tracaService: TracaService, private prodProcessService: ProdProcessServiceService) { }
  ngAfterViewInit(): void {
    // document.getElementById('operator').onclick = () => {
    //   this.process = null;
    //   this.lastOpe = null;
    // };
  }

  ngOnInit(): void {
  }
  upDateProcess(refSap?: any, workorder?: any) {
    if (this.process) {
      return this.prodProcessService.getAllTraca(7172102, 53000000);

    } else {
      return this.prodProcessService.getAllTraca(refSap, workorder);
    }
  }
  getScanedInput(input: any) {
    this.upDateProcess(input.refSap, input.of).subscribe(res => {
      this.process = res;
      console.log(this.process);
      if (this.process.process.prodProcess.DATE_DEBUT == null) {
        //Débuter le process et la première opération
        //console.log("c'est ici qu'on a lancé l'OP");
        this.tracaService.launchOperation(this.process.process.LISTE_OPERATIONS[0], this.process.process.prodProcess).subscribe(res => {
          this.process.process.LISTE_OPERATIONS[0].prodOperation = res;
          this.lastOpe = {
            opSAP: this.process.process.LISTE_OPERATIONS[0],
            groupOpe: this.process.process.LISTE_OPERATIONS[0]['OPERATION_GROUP'][0],
            opeDet: this.process.process.LISTE_OPERATIONS[0]['OPERATION_GROUP'][0]['OPERATIONS_DETAILLEES'][0]
          }

        });
      } else {
        for (const operation of this.process.process.LISTE_OPERATIONS) {
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
