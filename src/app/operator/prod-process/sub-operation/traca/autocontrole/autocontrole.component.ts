import { Component, Input, OnInit } from '@angular/core';
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
  @Input() subOperation: any;
  @Input() enableTraca: boolean;

  tracasArray = new FormArray([]);
  toolList: any;

  constructor(private controlToolService: ControlToolService, private tracaService: TracaService) { }

  ngOnInit(): void {
    this.controlToolService.getControlToolList().subscribe((response: any) => {
      this.toolList = response;
      this.tracas.forEach((traca: any) => {
        this.addControl(traca);
      });
    });
  }

  addControl(traca: any) {
    this.tracasArray.push(new FormControl({
      idTraca: traca.ID_TRACA,
      idTracaControl: traca.ID_TRACA_CONTROLE,
      sanction: traca.PROD_TRACA.SANCTION,
      comment: traca.PROD_TRACA.COMMENTAIRE == 'undefined' ? "pas de commentaire" : traca.PROD_TRACA.COMMENTAIRE,
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
      this.tracaService.saveTracaControl(traca, this.subOperation).subscribe((response: any) => {
      })
    });

  }
}
