import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlToolService } from 'src/app/service/control-tool.service';
import { TracaService } from 'src/app/service/traca.service';

@Component({
  selector: 'app-autocontrole',
  templateUrl: './autocontrole.component.html',
  styleUrls: ['./autocontrole.component.css']
})
export class AutocontroleComponent implements OnInit, OnChanges {
  @Input() tracas: any;
  @Input() step: any;
  @Input() enableTraca: boolean;
  @Input() currentStep: any;
  @Output() emitTraca: any = new EventEmitter<any>();
  toolList: any;
  tracaList: any = [];

  constructor(private controlToolService: ControlToolService, private tracaService: TracaService, private fb: FormBuilder) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.tracas);
    console.log(this.tracas);

  }

  ngOnInit(): void {
    this.controlToolService.getControlToolList().subscribe((response: any) => {
      this.toolList = response;
    });
  }

  getState(): boolean {
    return this.enableTraca;
  }

  getTool(ID_TYPE_ECME: any) {
    if (ID_TYPE_ECME) {
      return this.toolList.find(tool => tool.ID_TYPE_ECME == ID_TYPE_ECME).TYPE_ECME
    } else {
      return 0;
    }
  }


  toggleConf(target: HTMLElement, traca: any) {
    target.classList.toggle('selected');
    if (target.classList.contains('ok')) {
      if (target.parentElement.querySelector('.nok').classList.contains('selected')) {
        target.parentElement.querySelector('.nok').classList.remove('selected');

      }
      traca.prodTracaDetail = { SANCTION: 1, COMMENTAIRE: '' }
    } else {
      if (target.parentElement.querySelector('.ok').classList.contains('selected')) {
        target.parentElement.querySelector('.ok').classList.remove('selected');

      }
      traca.prodTracaDetail = { SANCTION: 0, COMMENTAIRE: '' };
    }
  }


  addComment(traca, eventTarget) {
    traca.prodTracaDetail.COMMENTAIRE = eventTarget;

  }


  recordTraca() {

    this.tracaService.saveTracaControl(this.tracas, this.currentStep).then(() => {
      this.emitTraca.emit(true);
    })

  }
}
