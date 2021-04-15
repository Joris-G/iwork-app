import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TracaService } from '@app/service/traca.service';

@Component({
  selector: 'app-operation-group',
  templateUrl: './operation-group.component.html',
  styleUrls: ['./operation-group.component.css']
})
export class OperationGroupComponent implements OnInit, OnDestroy {
  @Input() opeGroup: any;
  @Output() currentSubOperation: any = new EventEmitter<any>();
  @Input() prodOperation: any;
  prodSubOperations: any;
  constructor(private tracaService: TracaService) { }
  ngOnDestroy(): void {
    this.tracaService.stopOperationTimer(this.prodOperation);
  }

  ngOnInit(): void {
    console.log(this.prodOperation);
    (this.prodOperation) ? this.prodSubOperations = this.prodOperation.subOperations : this.prodSubOperations = false;
  }
  toggleGroupVisibility(opeGroup: any, eventTarget: Node) {
    if (eventTarget.textContent == 'expand_more') {
      eventTarget.textContent = 'expand_less';
    } else {
      eventTarget.textContent = 'expand_more';
    }
    const subOperations = eventTarget.parentElement.parentElement.querySelectorAll(`.subOperation`);
    subOperations.forEach(subope => {
      subope.classList.toggle('hide');
    });
  }

  subOperationclickEvent(subOperation: any, event: any) {
    this.emitClickedSubOperation(subOperation);
    this.toggleSubOperationState(event.target);
    if (!this.prodSubOperations) {
      console.log(this.prodOperation);
      this.currentSubOperation.subscribe(res => {
        console.log(res);
      })
      console.log(this.prodSubOperations);
      // this.tracaService.launchOperation(this.prodOperation,).subscribe((response: any) => {
      // });
    }
    this.tracaService.initOperationTimer();
  }

  emitClickedSubOperation(subOperation: any) {
    console.log('emit currentSubOpe', subOperation);
    this.currentSubOperation.emit(subOperation);
  }

  toggleSubOperationState(eventTarget: HTMLElement) {
    const isAnyActiveSubOperation = document.getElementsByClassName('active-subOp');
    if (isAnyActiveSubOperation) {
      for (let index = 0; index < isAnyActiveSubOperation.length; index++) {
        isAnyActiveSubOperation[index].classList.remove('active-subOp');
      }
    }
    eventTarget.classList.toggle('active-subOp')
  }

}
