import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  @Input() process;
  constructor() { }

  ngOnInit(): void {
    console.log(this.process);
    document.onmouseover = (event) => {
      // console.log(event.target);
    }
  }

}
