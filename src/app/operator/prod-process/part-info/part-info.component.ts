import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
