import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TracaService } from '@app/service/traca.service';

@Component({
  selector: 'app-operation-group',
  templateUrl: './operation-group.component.html',
  styleUrls: ['./operation-group.component.css']
})
export class OperationGroupComponent implements OnInit {
  @Input() opeGroup: any;
  @Output() currentSubOperation: any = new EventEmitter<any>();
  constructor(private tracaService: TracaService) { }

  ngOnInit(): void {
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
    if (!subOperation.PROD) {
      this.tracaService.launchOperation(subOperation).subscribe((response: any) => {
      });
    }
  }

  emitClickedSubOperation(subOperation: any) {
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
