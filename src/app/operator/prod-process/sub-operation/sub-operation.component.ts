import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sub-operation',
  templateUrl: './sub-operation.component.html',
  styleUrls: ['./sub-operation.component.css']
})
export class SubOperationComponent implements OnInit, AfterViewInit {
  inputMat: any;
  @Input() subOperation: any;
  @ViewChild('inputQrCode') inputQr: ElementRef;
  focusTool: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.focusTool = setInterval(() => {
      this.inputQr.nativeElement.focus();
    }, 300);

  }

  confEvent() {
    console.log(this.subOperation);
  }
  inputAction(eventTarget: HTMLInputElement) {
    console.log(eventTarget.value);
    const firstSpace = eventTarget.value.search(' ');
    const identifier = eventTarget.value.slice(0, firstSpace);
    const inputDataScan = eventTarget.value.slice(firstSpace + 1).split(',');
    const techData = {
      refSap: inputDataScan[0],
      id: inputDataScan[1]
    }
    console.log(identifier);
    switch (identifier) {
      case 'MAT':

        this.inputMat = techData;
        break;
      case 'OF':
        break;

      default:
        break;
    }
    eventTarget.value = "";
  }
}
