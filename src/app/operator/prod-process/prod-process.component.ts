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
    console.log(changes);
    this.currentOperation = changes.lastOpe.currentValue.opSAP;
    this.currentSubOperation = changes.lastOpe.currentValue.opeDet;

    this.prodProcessService.process.subscribe(currentObject => {
      console.log(currentObject);
      this.tracaService.launchOperation(changes.lastOpe.currentValue.opSAP, currentObject.process.prodProcess)
    });
  }


  upDateStep(event) {
    console.log(event);
  }

  showOperation(operation: any) {
    this.currentSubOperation = null;
    this.currentOperation = operation;
  }
  showSubOperation(subOperation: any) {
    this.currentSubOperation = subOperation;
  }
}
