import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sub-process',
  templateUrl: './sub-process.component.html',
  styleUrls: ['./sub-process.component.css']
})
export class SubProcessComponent implements OnInit, OnChanges {
  @Output() currentSubOperation: any = new EventEmitter<any>();
  @Input() operations: any;
  anyTraca: boolean;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    console.log(this.operations);
  }

  showOp(item: any) {
    console.log(item);
    this.currentSubOperation.emit(item);
  }


}
