import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sub-process',
  templateUrl: './sub-process.component.html',
  styleUrls: ['./sub-process.component.css']
})
export class SubProcessComponent implements OnInit {
  @Output() currentSubOperation: any = new EventEmitter<any>();
  @Input() operations: any;
  anyTraca: boolean;
  constructor() { }

  ngOnInit(): void {
    console.log(this.operations);

  }

  showOp(item: any) {
    console.log(item);
    this.currentSubOperation.emit(item);
  }


}
