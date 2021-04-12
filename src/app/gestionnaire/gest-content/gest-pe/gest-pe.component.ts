import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplyService } from '@app/service/supply.service';
import { FileFunction } from '@app/_helpers/file.functions';

@Component({
  selector: 'app-gest-pe',
  templateUrl: './gest-pe.component.html',
  styleUrls: ['./gest-pe.component.css']
})
export class GestPeComponent implements OnInit {
  getList: any;
  constructor(private supplyService: SupplyService, private fileFunction: FileFunction, private router: Router) { }

  ngOnInit(): void {
  }
  async onFileSelected(event: any) {
    console.log(event);
    this.getList = await this.fileFunction.getCsv(event);
  }
  showImportInfo() {

  }
  startPe() {
    this.router.navigate(['/app-stickers'], { state: { data: this.getList } });
  }
}
