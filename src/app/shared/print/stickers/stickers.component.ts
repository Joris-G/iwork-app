import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.css']
})
export class StickersComponent implements OnInit {
  @Input() stickersDatas: any[] = [];
  constructor(private router: Router) {
    this.router.getCurrentNavigation().extras.state.data.shift();
    const data = this.router.getCurrentNavigation().extras.state.data;
    data.forEach((part, index) => {
      data[index]['datas'] = [];
      for (let repeat = 0; repeat < part[2]; repeat++) {
        data[index]['datas'].push([part[0], part[1], part[3]]);

      }
    });
    this.stickersDatas = data;
    console.log(data);
  }

  ngOnInit(): void {

  }

}
