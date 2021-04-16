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

  currentStep: any;

  @Input() currentSubOperation: any;
  @Input() process: any;
  @Input() currentOperation: any;

  @Output() nextStepEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private tracaService: TracaService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.defineCurrentStep(changes.currentSubOperation.currentValue.STEPS[0]);
  }

  @ViewChild('MatTabGroup') tabGroup: MatTabGroup;

  defineCurrentStep(step) {
    console.log('step active');
    this.currentStep = step;
  }


  activeStepEvent(event) {
    console.log(event);
  }


  ngOnInit(): void {
    this.currentSubOperation.STEPS.forEach(step => {
      if (!step.prodStep) {
        console.log('init step');
        this.currentStep = step;
        this.tracaService.launchStep(step, this.currentSubOperation).subscribe(res => {
          this.currentStep.prodStep = res;
        });
      } else if (!step.prodStep.DATE_FIN) {
        console.log('step continue');
        this.currentStep = step;
      }

    });
    console.log(this.currentSubOperation.STEPS);
    console.log(["Voici les inputs du composant subOperation", this.currentSubOperation, this.process]);
    if (this.currentSubOperation.prodSubOperation) {
      console.log(this.currentSubOperation);
    } else {
      console.log("Launch subOperation");
      this.tracaService.launchSubOperation(this.currentSubOperation, this.currentOperation).subscribe(res => {
        this.currentSubOperation.prodSubOperation = res;
        console.log(this.currentSubOperation);
      });
    }
  }



  ngAfterViewInit() {
    this.focusTool = setInterval(() => {

      this.inputQr.nativeElement.focus();
    }, 300);
    document.addEventListener('click', (event) => {
      // console.log(event.target);
      clearInterval(this.focusTool);
    })
  }




  confEvent() {
    console.log('conf event', this.currentStep);
    this.tracaService.confStep(this.currentStep).subscribe(res => {
      const nativeStep = this.currentSubOperation.STEPS.find(nativeStep => nativeStep == this.currentStep);
      nativeStep.prodStep.DATE_FIN = Date();
      console.log(nativeStep.prodStep.DATE_FIN);
      console.log('step confirmé', res);
      //Test si dernière step de la suboperation
      const lastStep = this.currentSubOperation.STEPS.slice(-1);
      console.log(lastStep, this.currentStep.ID_STEP, lastStep[0].ID_STEP);
      if (this.currentStep.ID_STEP == lastStep[0].ID_STEP) {
        this.tracaService.confSubOperation(this.currentSubOperation).subscribe(res => {
          console.log('subOpe confirmée', res);
          //Test si dernière subOpe dans le groupe
        });
        //Définir le nouveau groupe
      } else {
        // TROUVER le step suivant
        console.log('On cherche dans ce tableau', this.currentSubOperation.STEPS);
        console.log('Cet élément', this.currentStep);
        const indexCurrentStep = this.currentSubOperation.STEPS.findIndex(testStep => testStep.ID_STEP == this.currentStep.ID_STEP)
        console.log(indexCurrentStep, indexCurrentStep + 1);
        //Definir current Step == le step suivant
        this.currentStep = this.currentSubOperation.STEPS[indexCurrentStep + 1]
        this.tabGroup.selectedIndex = (indexCurrentStep + 1);
        // this.nextStepEmitter.emit(this.currentSubOperation.STEPS[indexCurrentStep + 1]);
        console.log('next step', this.currentSubOperation.STEPS[indexCurrentStep + 1]);
      }
    });
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
