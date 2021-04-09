import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProcessService } from '@app/service/process.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {
  @Input() step: any;
  editInstruction: boolean = false;
  @ViewChild('inputInstruction') inputInstruction: ElementRef<HTMLInputElement>;
  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
  }

  editInstructionAction() {
    // Si je suis en mode editer
    if (this.editInstruction) {
      console.log("J'étais en mode édition");
      // Si la valeur a changer
      if (this.step.INSTRUCTION.INSTRUCTION != this.inputInstruction.nativeElement.value) {
        console.log("Le nom a changé");
        this.step.INSTRUCTION.INSTRUCTION = this.inputInstruction.nativeElement.value;
        this.processService.modifyInstruction(this.step.ID_STEP, this.inputInstruction.nativeElement.value).subscribe((res: any) => {

        });
      } else {
        console.log("Le nom n'a pas changé");
      }
    }
    console.log('switch mode');
    this.editInstruction = !this.editInstruction;
  }
  editImgAction() {
    console.log("coucou la compagnie");
  }

}
