import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProcessService } from '@app/service/process.service';

@Component({
  selector: 'app-sub-operation',
  templateUrl: './sub-operation.component.html',
  styleUrls: ['./sub-operation.component.css']
})
export class SubOperationComponent implements OnInit {
  @Input() subOpe: any;
  editSubOpName: boolean = false;
  @ViewChild('inputSubOpName') inputSubOpName: ElementRef<HTMLInputElement>;
  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
  }
  editOperationAction() {
    // Si je suis en mode editer
    if (this.editSubOpName) {
      console.log("J'étais en mode édition");
      // Si la valeur a changer
      if (this.subOpe.DESCRIPTION_OPERATION != this.inputSubOpName.nativeElement.value) {
        console.log("Le nom a changé");
        this.subOpe.DESCRIPTION_OPERATION = this.inputSubOpName.nativeElement.value;
        this.processService.modifySubOperationName(this.subOpe.ID_OPERATION, this.inputSubOpName.nativeElement.value).subscribe((res: any) => {

        });
      } else {
        console.log("Le nom n'a pas changé");
      }
    }
    console.log('switch mode');
    this.editSubOpName = !this.editSubOpName;
  }

}
