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

  @Input() subOpe: any;
  @Input() operation: any;
  @Input() prodProcess: any;

  anyTraca: boolean;
  constructor(private tracaService: TracaService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.prodProcess, this.operation);
    // if (this.prodOperation) {
    //   // this.tracaService.continueOperation(this.prodOperation,).subscribe((response: any) => {
    //   //   });
    // } else {
    //   console.log('launch');
    //   this.tracaService.launchOperation(this.operation, this.prodProcess.prodProcess).subscribe((response: any) => {
    //   });
    // }

  }

  ngOnInit(): void {
  }

  showOp(item: any) {
    console.log(item);
    this.currentSubOperation.emit(item);
  }


}
