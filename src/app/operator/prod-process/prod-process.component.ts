import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.prodProcess = this.scanInput;
    console.log(this.lastOpe);
    this.currentOperation = this.lastOpe.opSAP;
    this.currentSubOperation = this.lastOpe.opeDet;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
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
