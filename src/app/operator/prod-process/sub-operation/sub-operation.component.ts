import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { TracaService } from '@app/service/traca.service';
import { SubOperation } from '@app/_interfaces/process';
import { ProdSubOperation } from '@app/_interfaces/prod-process';

@Component({
  selector: 'app-sub-operation',
  templateUrl: './sub-operation.component.html',
  styleUrls: ['./sub-operation.component.css'],
})
export class SubOperationComponent implements OnInit, AfterViewInit, OnChanges {
  inputMat: any;
  @ViewChild('inputQrCode') inputQr: ElementRef;
  focusTool: any;
  prodTracaStep: any;
  currentStep: any;

  @Input() currentSubOperation: any;
  @Input() process: any;
  @Input() currentOperation: any;

  @Output() nextStepEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private tracaService: TracaService) { }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("OnChange");
    //console.log(changes.currentSubOperation.currentValue);
    this.defineCurrentStep(changes.currentSubOperation.currentValue.STEPS[0]);
    this.launchSubOperation()
  }

  @ViewChild('MatTabGroup') tabGroup: MatTabGroup;

  defineCurrentStep(step) {
    this.currentStep = step;
  }


  activeStepEvent(event) {
  }


  ngOnInit(): void {
    //console.log("onInit");
    // if (this.currentSubOperation.prodSubOperation) {
    // } else {
    //   this.launchSubOperation();

    // }


  }
  launchSubOperation() {
    //Si pas déjà débutée on lance la subOPE
    if (!this.currentSubOperation.prodSubOperation) {
      console.log("c'est ici qu'on a lancé  la subOPE!");
      console.log(this.currentSubOperation, this.currentOperation);
      this.tracaService.launchSubOperation(this.currentSubOperation, this.currentOperation).subscribe(res => {
        this.currentSubOperation.prodSubOperation = res;
        const firstStep = this.currentSubOperation.STEPS[0];
        this.currentStep = firstStep;
        this.launchStep(firstStep);
      });
    }
    //Sinon on cherche la première step non réalisée
    else {
      this.currentSubOperation.STEPS.forEach(step => {
        //Si la step n'est pas initiée
        if (!step.prodStep) {
          this.launchStep(step);
          this.currentStep = step;
        }
      })
    }
  }

  launchStep(step: any) {
    this.tracaService.launchStep(step, this.currentSubOperation).subscribe(res => {
      this.currentStep.prodStep = res;
      //console.log("Lancement de la step");
    });
  }




  ngAfterViewInit() {
    this.focusTool = setInterval(() => {

      this.inputQr.nativeElement.focus();
    }, 300);
    document.addEventListener('click', (event) => {
      clearInterval(this.focusTool);
    })
  }




  confEvent() {
    this.tracaService.confStep(this.currentStep).subscribe(res => {
      const nativeStep = this.currentSubOperation.STEPS.find(nativeStep => nativeStep == this.currentStep);
      nativeStep.prodStep = res;
      //Test si dernière step de la suboperation
      const lastStep = this.currentSubOperation.STEPS.slice(-1);
      if (this.currentStep.ID_STEP == lastStep[0].ID_STEP) {
        this.tracaService.confSubOperation(this.currentSubOperation).subscribe(res => {
          //Test si dernière subOpe dans le groupe
        });
        //Définir le nouveau groupe
      } else {
        // TROUVER le step suivant
        const indexCurrentStep = this.currentSubOperation.STEPS.findIndex(testStep => testStep.ID_STEP == this.currentStep.ID_STEP)
        //Definir current Step == le step suivant
        this.currentStep = this.currentSubOperation.STEPS[indexCurrentStep + 1]
        this.tabGroup.selectedIndex = (indexCurrentStep + 1);
        // this.nextStepEmitter.emit(this.currentSubOperation.STEPS[indexCurrentStep + 1]);
      }
    });
  }




  inputAction(eventTarget: HTMLInputElement) {
    console.log(eventTarget);
    const firstSpace = eventTarget.value.search(' ');
    const identifier = eventTarget.value.slice(0, firstSpace);
    const inputDataScan = eventTarget.value.slice(firstSpace + 1).split(',');
    console.log(firstSpace, identifier, inputDataScan);
    const techData = {
      refSap: inputDataScan[0],
      id: inputDataScan[1]
    }
    if (identifier) {
      switch (identifier) {
        case 'MAT':
          this.inputMat = techData;
          break;
        case 'OF':
          break;

        default:
          break;
      }
    } else {
      if (inputDataScan[0] == "1") {
        this.confEvent();
      }
    }
    eventTarget.value = "";
  }
}
