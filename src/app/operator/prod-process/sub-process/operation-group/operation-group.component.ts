import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { TracaService } from '@app/service/traca.service';

@Component({
  selector: 'app-operation-group',
  templateUrl: './operation-group.component.html',
  styleUrls: ['./operation-group.component.css']
})
export class OperationGroupComponent implements OnInit, OnDestroy, OnChanges {
  @Input() opeGroup: any;
  @Output() currentSubOperation: any = new EventEmitter<any>();
  @Input() currentSubOpe: any;
  @Input() prodOperation: any;
  prodSubOperations: any;

  constructor(private tracaService: TracaService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("opegroupe CHANGE", changes.currentSubOpe);
    (this.prodOperation) ? this.prodSubOperations = this.prodOperation.subOperations : this.prodSubOperations = false;
    for (const key in changes) {
      //console.log(key, "à changé");
      //console.log(changes[key]);

    }
  }
  ngOnDestroy(): void {
    this.tracaService.stopOperationTimer(this.prodOperation);
  }

  ngOnInit(): void {

  }

  isActive(subOpeToTest: any): boolean {
    if (this.currentSubOpe.ID_OPERATION_DETAILLEE == subOpeToTest.ID_OPERATION_DETAILLEE) {
      return true;
    } else {
      return false;
    }
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
      this.currentSubOperation.subscribe(res => {
      })
      // this.tracaService.launchOperation(this.prodOperation,).subscribe((response: any) => {
      // });
    }
    // this.tracaService.initOperationTimer();
  }

  emitClickedSubOperation(subOperation: any) {
    (subOperation == this.currentSubOperation) ? '' : this.currentSubOperation.emit(subOperation);

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
