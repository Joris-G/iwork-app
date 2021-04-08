import { Component, Input, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-prod-process',
  templateUrl: './prod-process.component.html',
  styleUrls: ['./prod-process.component.css']
})
export class ProdProcessComponent implements OnInit {

  // prodProcess: any = {
  //   part: {
  //     REFSAP: 7172242,
  //     DESIGNATION: 'BOX LH',
  //   },
  //   workorder: 53000000,
  //   name: '',
  //   process: {
  //     id: 1,
  //     operations: [{
  //       OPERATION_NUMBER: 1,
  //       OPERATION_NAME: 'DECOUPE LECTRA',
  //       subOperations: [
  //         {
  //           type: 'CONTROLE',
  //           title: 'Controle des hinges',
  //           instruction: "S'assurer qu'il n'y a pas de bavures",
  //           traca:{
  //             type:'CONTROLE',
  //           }
  //         },
  //         {
  //           type: 'COLLAGE',
  //           title: 'Faire le collage',
  //           instruction: "Dégraisser puis déposer un film de colle d'épaisseur constante sur le support",
  //           traca:{
  //             type:'MATIERE'
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       OPERATION_NUMBER: 2,
  //       OPERATION_NAME: 'MOULAGE',
  //       subOperations: [
  //         {
  //           type: 'CONTROLE',
  //           title: 'Kit complet ?',
  //           instruction: "Compter les plis puis comparer avec le nombre total de plis théorique",
  //           traca:{
  //             type:'AUTO-CONTROLE'
  //           }
  //         },
  //         {
  //           type: 'MOULAGE',
  //           title: 'Poser le plis S1P1',
  //           instruction: "Draper suivant instructions",
  //           traca:{
  //             type:'AUTO-CONTROLE'
  //           }
  //         },
  //       ]
  //     }]
  //   }
  // };
  prodProcess: any;
  currentOperation: any;
  currentSubOperation: any;
  @Input() scanInput: any;
  @Input() lastOpe: any;

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.prodProcess = this.scanInput;
    console.log(this.lastOpe);
    this.currentOperation = this.lastOpe.opSAP;
    this.currentSubOperation = this.lastOpe.opeDet;
  }

  showOperation(operation: any) {
    this.currentSubOperation = null;
    this.currentOperation = operation;
  }
  showSubOperation(subOperation: any) {
    this.currentSubOperation = subOperation;
  }
}
