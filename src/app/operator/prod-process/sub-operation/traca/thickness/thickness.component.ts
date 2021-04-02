import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thickness',
  templateUrl: './thickness.component.html',
  styleUrls: ['./thickness.component.css']
})
export class ThicknessComponent implements OnInit {
  @Input() tracas: any;
  @Input() subOperation: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.tracas);
    console.log(this.subOperation);
  }

}
