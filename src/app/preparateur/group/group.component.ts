import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProcessService } from '@app/service/process.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() group;
  editGroupName: boolean = false;
  @ViewChild('inputGroupName') inputGroupName: ElementRef<HTMLInputElement>;
  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
  }

  editGroupAction() {
    // Si je suis en mode editer
    if (this.editGroupName) {
      console.log("J'étais en mode édition");
      // Si la valeur a changer
      if (this.group.NOM != this.inputGroupName.nativeElement.value) {
        console.log("Le nom a changé");
        this.group.NOM = this.inputGroupName.nativeElement.value;
        this.processService.modifyGroupName(this.group.ID_GROUP, this.inputGroupName.nativeElement.value).subscribe((res: any) => {

        });
      } else {
        console.log("Le nom n'a pas changé");
      }
    }
    console.log('switch mode');
    this.editGroupName = !this.editGroupName;
  }
}
