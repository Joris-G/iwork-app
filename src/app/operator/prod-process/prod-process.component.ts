import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProdProcessServiceService } from '@app/service/prod-process-service.service';
import { TracaService } from '@app/service/traca.service';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-prod-process',
  templateUrl: './prod-process.component.html',
  styleUrls: ['./prod-process.component.css']
})
export class ProdProcessComponent implements OnInit, OnChanges {

  currentOperation: any;
  currentSubOperation: any;
  @Input() process: any;
  @Input() lastOpe: any;

  constructor(private materialService: MaterialService, private prodProcessService: ProdProcessServiceService, private tracaService: TracaService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("prodProcess Change", this.process);
    if (changes.lastOpe.previousValue != changes.lastOpe.currentValue) {
      // this.prodProcessService.process.subscribe(currentObject => {
      //console.log("c'est ici qu'on a lancé l'OP");
      //console.log(changes.lastOpe.currentValue.opSAP, currentObject.process.prodProcess);

      if (!changes.lastOpe.currentValue.opSAP.prodOperation) {
        this.tracaService.launchOperation(changes.lastOpe.currentValue.opSAP, this.process.process.prodProcess).subscribe(res => {
          this.currentOperation = changes.lastOpe.currentValue.opSAP;
          this.currentSubOperation = changes.lastOpe.currentValue.opeDet;
          this.currentOperation.prodOperation = res;
        });
      } else {
        this.currentOperation = changes.lastOpe.currentValue.opSAP;
        this.currentSubOperation = changes.lastOpe.currentValue.opeDet;
      }
      // });
    }



  }

  updateProcess(updatedProcess) {
    this.process = updatedProcess;
    // this.prodProcessService.getAllTraca(this.process.ARTICLE.ARTICLE_SAP, this.process.process.prodProcess.ORDRE_FABRICATION).subscribe(res => {
    //   console.log(res);
    //   this.process = res;
    // });
  }

  upDateStep(event) {
  }

  showOperation(operation: any) {
    this.currentSubOperation = null;
    this.currentOperation = operation;
  }
  showSubOperation(subOperation: any) {
    this.currentSubOperation = subOperation;
  }
}
