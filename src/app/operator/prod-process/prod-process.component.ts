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

  prodProcess: any;
  currentOperation: any;
  currentSubOperation: any;
  @Input() scanInput: any;
  @Input() lastOpe: any;

  constructor(private materialService: MaterialService, private prodProcessService: ProdProcessServiceService, private tracaService: TracaService) { }

  ngOnInit(): void {
    this.prodProcess = this.scanInput;
    console.log(this.lastOpe);
    console.log(this.prodProcess);
    this.currentOperation = this.lastOpe.opSAP;
    this.currentSubOperation = this.lastOpe.opeDet;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.prodProcessService.process.subscribe(currentObject => {
      console.log(currentObject);
      console.log(this.prodProcess);
      this.tracaService.launchOperation(changes.lastOpe.currentValue.opSAP, currentObject.prodProcess.ID_PROD_PROCESS);
    });

    this.ngOnInit();
  }

  showOperation(operation: any) {
    this.currentSubOperation = null;
    this.currentOperation = operation;
  }
  showSubOperation(subOperation: any) {
    this.currentSubOperation = subOperation;
  }
}
