import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  @Input() process;
  operationSelect: boolean = false;
  selectedOperation: any;
  subOperationSelect: boolean = false;
  selectedStep: any;
  stepSelect: boolean = false;
  showGroupsDetails: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.process);
    document.onmouseover = (event) => {
      // console.log(event.target);
    }
  }
  operationAction(operation: any) {
    if (operation == this.selectedOperation) {
      this.selectedOperation = null;
      this.operationSelect = false;
    } else {
      this.selectedOperation = operation;
      this.operationSelect = true;
    }
  }
  showStep(step: any) {
    console.log(step);
    if (step) {
      this.stepSelect = true;
      this.selectedStep = step;
    } else {
      this.stepSelect = false;
      this.selectedStep = null;
    }

  }
  toggleShowDetails() {
    this.showGroupsDetails = !this.showGroupsDetails;
  }

}
