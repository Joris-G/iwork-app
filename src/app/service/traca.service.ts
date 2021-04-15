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
    console.log('start timer operation');
  }
  stopOperationTimer(prodOperation: any) {
    this.endPointOpeartion = new Date();
    console.log('end timer operation');
    this.addOperationTime(prodOperation);
  }

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  launchOperation(operation: any, prodProcess: any) {
    return this.http.get(`${this.baseUrl}/launchScript.php?typeOperation=ope&idProdProcess=${prodProcess.ID_PROD_PROCESS}&idOperation=${operation.ID_OPERATION}`);
  }

  launchSubOperation(subOperation: any) {
    return this.http.get(`${this.baseUrl}/launchScript.php?typeOperation=subOpe&idProdoperation=1&idProdSubOpe=${subOperation.ID_OPERATION_DETAILLEE}`);
  }

  saveTracaControl(traca: any, subOperation: any) {
    return this.http.get(`${this.baseUrl}/recordTraca.php?tracaType=controle&idProdSubOp=${subOperation.PROD.ID_PROD_SUBOP}&idTraca=${traca.idTraca}&idTracaControle=${traca.idTracaControl}&idEcme=${traca.ECME}&sanction=${traca.sanction}&dateExection=${traca.dateExecution}&comment=${traca.comment}`);
  }
  saveTracaMatiere(traca: any, subOperation: any) {
    return this.http.get(`${this.baseUrl}/recordTraca.php?tracaType=matiere&idProdSubOp=${subOperation.PROD.ID_PROD_SUBOP}&idTraca=${traca.idTraca}&idTracaMatiere=${traca.idTracaMatiere}&idMat=${traca.idMatiere}&sanction=${traca.sanction}&dateExecution=${traca.dateExecution}&comment=${traca.comment}`);
  }
  saveTracaOf(traca: any, subOperation: any) {
    return this.http.get(`${this.baseUrl}/recordTraca.php?tracaType=of&idProdSubOp=${subOperation.PROD.ID_PROD_SUBOP}&idTraca=${traca.idTraca}&idTracaOf=${traca.idTracaOf}&recordedOf=${traca.recordedOf}&sanction=${traca.sanction}&dateExecution=${traca.dateExecution}&comment=${traca.comment}`);
  }

  getPreviousTraca(idTraca: number) {
    return this.http.get(`${this.baseUrl}/getPreviousTraca.php?tracaType=mesure&idTraca=${idTraca}`);
  }
  addOperationTime(prodOperation: any) {
    const duree = this.endPointOpeartion.getTime() - this.startPointOperation.getTime();
    console.log(duree);
  }
}


