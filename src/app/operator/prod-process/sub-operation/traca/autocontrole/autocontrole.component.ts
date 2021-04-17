import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ControlToolService } from 'src/app/service/control-tool.service';
import { TracaService } from 'src/app/service/traca.service';

@Component({
  selector: 'app-autocontrole',
  templateUrl: './autocontrole.component.html',
  styleUrls: ['./autocontrole.component.css']
})
export class AutocontroleComponent implements OnInit {
  @Input() tracas: any;
  @Input() step: any;
  @Input() enableTraca: boolean;
  @Input() currentStep: any;
  tracasArray = new FormArray([]);
  toolList: any;

  constructor(private controlToolService: ControlToolService, private tracaService: TracaService) { }

  ngOnInit(): void {
    this.controlToolService.getControlToolList().subscribe((response: any) => {
      this.toolList = response;
      const prodTraca = "No comment"
      this.tracas.forEach((traca: any) => {
        this.addControl(traca);
      });
    });
  }

  getState(): boolean {
    return this.enableTraca;
  }

  addControl(traca: any) {
    this.tracasArray.push(new FormControl({
      idTraca: traca.ID_TRACA,
      idTracaControl: traca.ID_TRACA_CONTROLE,
      sanction: traca.prodTracaDetail.SANCTION,
      comment: (traca.prodTracaDetail) ? traca.prodTracaDetail.COMMENTAIRE : "pas de commentaire",
      text: traca.TEXTE_TRACA,
      ECME: traca.ID_TYPE_ECME,
      designationECME: this.getTool(traca.ID_TYPE_ECME),
    }));
  }

  getTool(ID_TYPE_ECME: any) {
    if (ID_TYPE_ECME) {
      return this.toolList.find(tool => tool.ID_TYPE_ECME == ID_TYPE_ECME).TYPE_ECME
    } else {
      return 0;
    }
  }


  toggleConf(target: HTMLElement, traca: FormControl) {
    target.classList.toggle('selected');
    if (target.classList.contains('ok')) {
      if (target.parentElement.querySelector('.nok').classList.contains('selected')) {
        target.parentElement.querySelector('.nok').classList.remove('selected');

      }
      traca.value.sanction = 1
    } else {
      if (target.parentElement.querySelector('.ok').classList.contains('selected')) {
        target.parentElement.querySelector('.ok').classList.remove('selected');

      }
      traca.value.sanction = 0
    }
  }

  recordTraca(tracas: any) {
    tracas.forEach((traca: any) => {
      this.tracaService.saveTracaControl(traca, this.currentStep).subscribe((response: any) => {
      })
    });

  }
}
