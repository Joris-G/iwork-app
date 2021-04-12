import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PartService } from '@app/service/part.service';
import { ProdProcessServiceService } from '@app/service/prod-process-service.service';

@Component({
  selector: 'app-preparateur',
  templateUrl: './preparateur.component.html',
  styleUrls: ['./preparateur.component.css']
})
export class PreparateurComponent implements OnInit, OnChanges, AfterViewInit {
  displayedColumns: string[] = ['idProcess', 'version', 'creationDate', 'creator', 'startService'];
  dataSource: MatTableDataSource<any>;
  displayProcess: boolean = false;
  allProcess: any;
  selectedProcess: any;
  @ViewChild('articleSapInput') inputArticle: ElementRef<HTMLInputElement>;
  displayProcessList: boolean = false;
  constructor(private processService: ProdProcessServiceService, private partService: PartService) { }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {

  }


  rowProcessClickAction(row: any) {
    console.log(row);
    this.showProcess(row.idProcess);
  }
  showProcess(idProcess: string) {
    this.displayProcess = !this.displayProcess;
    this.displayProcessList = false;
    this.selectedProcess = this.allProcess.find(process => process.ID_PROCESS == idProcess);
  }

  getAllProcesses() {
    const article = this.inputArticle.nativeElement.value;
    this.processService.getAllProcesses(article).subscribe((res: any) => {
      this.displayProcessList = true;
      this.allProcess = res
      console.log(res);
      const data = []
      res.forEach(process => {
        data.push({ idProcess: process.ID_PROCESS, version: process.INDICE_PROCESS, creationDate: process.DATE_DE_CREATION, creator: process.UTILISATEUR_CREATION, startService: '07/04/2021' });
      });

      this.dataSource = new MatTableDataSource<any>(data);
      console.log(this.dataSource);

    })
  }
}
