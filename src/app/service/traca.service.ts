import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TracaService {




  startPointOperation: Date;
  endPointOpeartion: Date;



  initOperationTimer() {
    this.startPointOperation = new Date();
    //console.log('start timer operation');
  }


  stopOperationTimer(prodOperation: any) {
    this.endPointOpeartion = new Date();
    //console.log('end timer operation');
    this.addOperationTime(prodOperation);
  }

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  launchOperation(operation: any, prodProcess: any) {
    //console.log('launchOperation', operation, prodProcess);
    if (operation.prodOperation) {
      console.error("L'opération était déjà lancée");
      // return this.http.get(`${this.baseUrl}/launchScript.php?typeOperation=ope&idProdProcess=${prodProcess.ID_PROD_PROCESS}&idOperation=${operation.ID_OPERATION}`);
    } else {
      return this.http.get(`${this.baseUrl}/launchScript.php?typeOperation=ope&idProdProcess=${prodProcess.ID_PROD_PROCESS}&idOperation=${operation.ID_OPERATION}`);
    }
  }


  launchSubOperation(subOperation: any, prodOperation: any) {
    //console.log('launchSubOperation service', subOperation, prodOperation);
    return this.http.get(`${this.baseUrl}/launchScript.php?typeOperation=subOpe&idProdOperation=${prodOperation.prodOperation.ID_PROD_OPERATION}&idSubOpe=${subOperation.ID_OPERATION_DETAILLEE}`);

  }


  launchStep(step: any, prodSubOpe: any) {
    //console.log(prodSubOpe.prodSubOperation);
    return this.http.get(`${this.baseUrl}/launchScript.php?typeOperation=step&idProdSubOperation=${prodSubOpe.prodSubOperation.ID_PROD_SUBOP}&idStep=${step.ID_STEP}`);
  }


  confStep(step: any) {
    //console.log(step);
    return this.http.get(`${this.baseUrl}/confStep.php?idProdStep=${step.prodStep.ID_PROD_STEP}`);
  }


  confSubOperation(subOperation: any) {
    //console.log(subOperation);
    return this.http.get(`${this.baseUrl}/confSubOpe.php?idProdSubOpe=${subOperation.prodSubOperation.ID_PROD_SUBOP}`);
  }
  /**
   * 
   * @param tracas 
   * @param step On doit mettre une step
   * @returns 
   */
  saveTracaControl(tracas: any[], step: any) {
    //console.log(step, traca);

    return new Promise<void>((resolve, reject) => {
      let savedTracas = 0;
      tracas.forEach(traca => {
        this.http.get(`${this.baseUrl}/recordTraca.php?tracaType=controle&idProdStep=${step.prodStep.ID_PROD_STEP}&idTraca=${traca.ID_TRACA}&idTracaControle=${traca.ID_TRACA_CONTROLE}&idEcme=${traca.ID_ECME}&sanction=${traca.prodTracaDetail.SANCTION}&dateExection=${traca.dateExecution}&comment=${traca.prodTracaDetail.COMMENTAIRE}`).subscribe(res => {
          savedTracas = savedTracas + 1;
          if (tracas.length == savedTracas) {
            resolve();
          }
        })
      });
    });
  }


  saveTracaMatiere(traca: any, subOperation: any) {
    return this.http.get(`${this.baseUrl}/recordTraca.php?tracaType=matiere&idProdSubOp=${subOperation.PROD.ID_PROD_SUBOP}&idTraca=${traca.idTraca}&idTracaMatiere=${traca.idTracaMatiere}&idMat=${traca.idMatiere}&sanction=${traca.prodTracaDetail.sanction}&dateExecution=${traca.dateExecution}&comment=${traca.comment}`);
  }


  saveTracaOf(traca: any, subOperation: any) {
    return this.http.get(`${this.baseUrl}/recordTraca.php?tracaType=of&idProdSubOp=${subOperation.PROD.ID_PROD_SUBOP}&idTraca=${traca.idTraca}&idTracaOf=${traca.idTracaOf}&recordedOf=${traca.recordedOf}&sanction=${traca.sanction}&dateExecution=${traca.dateExecution}&comment=${traca.comment}`);
  }


  getPreviousTraca(idTraca: number) {
    return this.http.get(`${this.baseUrl}/getPreviousTraca.php?tracaType=mesure&idTraca=${idTraca}`);
  }


  addOperationTime(prodOperation: any) {
    const duree = this.endPointOpeartion.getTime() - this.startPointOperation.getTime();
    //console.log(duree);
  }


}


