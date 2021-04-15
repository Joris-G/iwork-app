import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TracaService } from '@app/service/traca.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sub-process',
  templateUrl: './sub-process.component.html',
  styleUrls: ['./sub-process.component.css']
})
export class SubProcessComponent implements OnInit, OnChanges {
  @Output() currentSubOperation: any = new EventEmitter<any>();
  curOpeTest
  @Input() operation: any;
  @Input() prodProcess: any;
  prodOperation: any;
  anyTraca: boolean;
  constructor(private tracaService: TracaService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.prodOperation, this.prodProcess, this.operation);
    this.prodOperation = (changes.prodProcess.currentValue.prodProcess.operations) ? changes.prodProcess.currentValue.prodProcess.operations.find(prodOperation => prodOperation.ID_PROD_OPERATION == this.operation.ID_OPERATION) : false;
    if (this.prodOperation) {
      // this.tracaService.continueOperation(this.prodOperation,).subscribe((response: any) => {
      //   });
    } else {
      console.log('launch');
      this.tracaService.launchOperation(this.operation, this.prodProcess.prodProcess).subscribe((response: any) => {
      });
    }

  }

  ngOnInit(): void {
    console.log(this.operation);
    console.log(this.prodProcess);

    this.prodOperation = (this.prodProcess.operations) ? this.prodProcess.operations.find(prodOperation => prodOperation.ID_PROD_OPERATION == this.operation.ID_OPERATION) : false;
    console.log(this.prodOperation);
  }

  showOp(item: any) {
    console.log(item);
    this.currentSubOperation.emit(item);
  }


}
