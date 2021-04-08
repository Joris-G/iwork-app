import { AfterContentInit, Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertService } from '@app/service/alert.service';
import { AlertComponent } from '@app/alert/alert.component';
import { Alert } from '@app/_interfaces/alert';

@Component({
  selector: 'app-traca',
  templateUrl: './traca.component.html',
  styleUrls: ['./traca.component.css']
})
export class TracaComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() tracaList: any;
  @Input() subOperation: any;
  @ViewChild('alertContainer', { read: ViewContainerRef }) alertContainer: ViewContainerRef;
  alertList = new Array(0);
  enable = true;

  @Input() tracaInput: any;
  role: any;

  constructor(private alertService: AlertService,
    private componentFactoryResolver: ComponentFactoryResolver) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngAfterContentInit(): void {
    // this.alertService.observable.subscribe(event => {
    //   this.loadNewAlertComponent(event);
    // });
  }

  ngOnInit(): void {
    console.log(this.tracaList);
    this.role = this.tracaList.ROLE;
    if (this.tracaList.PROD_TRACA_DETAILS) {
      this.enable = false;
    }
    // this.alertService.observable.subscribe(event => {
    //   this.loadNewAlertComponent(event);
    // });
  }

  // displayAnAlert() {
  //   this.alertService.displayAlert('My first alert is a success', 'success');
  // }
  // createComponent(alertComponent: Type<AlertComponent>) {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(alertComponent);
  //   console.log(componentFactory);
  //   console.log(this.alertContainer, alertComponent);
  //   return this.alertContainer.createComponent(componentFactory);
  // }

  // loadNewAlertComponent(event: Alert) {
  //   const component = this.createComponent(AlertComponent);
  //   (component.instance as AlertComponent).event = event;
  //   (component.instance as AlertComponent).eventToDelete.subscribe(() => {
  //     component.destroy();
  //   });
  //   component.changeDetectorRef.detectChanges();
  //   this.alertList[this.alertList.length] = component;
  // }

}
