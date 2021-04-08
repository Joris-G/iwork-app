import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-part-info',
  templateUrl: './part-info.component.html',
  styleUrls: ['./part-info.component.css']
})
export class PartInfoComponent implements OnInit {

  @Input() prodProcess: any;

  constructor() { }

  ngOnInit(): void {
  }

}
