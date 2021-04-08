import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ProdProcessServiceService } from 'src/app/service/prod-process-service.service';

@Component({
  selector: 'app-scan-input',
  templateUrl: './scan-input.component.html',
  styleUrls: ['./scan-input.component.css']
})
export class ScanInputComponent implements OnInit {

  @Output() scanInput = new EventEmitter<any>();
  focusTool: any;
  @ViewChild('inputOf') inputOf: ElementRef;
  constructor(private prodProcessService: ProdProcessServiceService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.focusTool = setInterval(() => {
      this.inputOf.nativeElement.focus();
    }, 300);
  }
  sendScanInput(inputText: any) {
    if (inputText.value.startsWith('OF', 0)) {
      const inputDataScan = inputText.value.slice(3).split(',');
      const techData = {
        refSap: inputDataScan[0],
        of: inputDataScan[1]
      }
      this.scanInput.emit(this.prodProcessService.getAllTraca(techData.refSap, techData.of));
    } else {
      console.error("C'est n'est pas un OF");

    }
    // this.scanInput.emit(inputText.value);
  }

}
