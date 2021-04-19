import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Error } from '@app/_interfaces/error';
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
  error: Error = {
    state: false,
    msg: ""
  };


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
      if (inputDataScan.length > 1) {
        const techData = {
          refSap: inputDataScan[0],
          of: inputDataScan[1]
        }
        // this.scanInput.emit(this.prodProcessService.getAllTraca(techData.refSap, techData.of));
        this.scanInput.emit(techData);
      } else {
        this.error = {
          state: true,
          msg: "Les données de l'OF ne sont pas valides"
        };
        console.error("Les données de l'OF ne sont pas valides. Vérifier que l'OF est connu du gestionnaire");
      }
    } else {
      this.error = {
        state: true,
        msg: "Ce n'est pas un OF valide"
      };
      console.error("C'est n'est pas un OF");

    }
    this.inputOf.nativeElement.value = "";
    // this.scanInput.emit(inputText.value);
  }

}
