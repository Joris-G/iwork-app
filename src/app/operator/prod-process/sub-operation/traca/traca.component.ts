import { AfterContentInit, Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertService } from '@app/service/alert.service';
import { AlertComponent } from '@app/alert/alert.component';
import { Alert } from '@app/_interfaces/alert';
import { ProdProcessServiceService } from '@app/service/prod-process-service.service';

@Component({
  selector: 'app-traca',
  templateUrl: './traca.component.html',
  styleUrls: ['./traca.component.css']
})
export class TracaComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() tracaList: any;
  @Input() step: any;
  @Input() currentStep: any;
  @ViewChild('alertContainer', { read: ViewContainerRef }) alertContainer: ViewContainerRef;
  alertList = new Array(0);
  enable: boolean = true;

  @Input() tracaInput: any;
  role: any;
  prodProcess: any;




  @Input() prodTracaStep: any;
  @Input() processTracaStep: any;


  constructor(private alertService: AlertService,
    private componentFactoryResolver: ComponentFactoryResolver, private prodProcessService: ProdProcessServiceService) {

  }
  displayQualityConnexion(eventTarget) {
    eventTarget.innerHTML = 'Scannez votre badge pour vous indentifier';
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.prodProcessService.process.subscribe(res => {
    //   this.prodProcess = res.prodProcess;
    // });
  }

  ngAfterContentInit(): void {
    // this.alertService.observable.subscribe(event => {
    //   this.loadNewAlertComponent(event);
    // });
  }

  ngOnInit(): void {
    this.enable = !this.tracaList.prodTraca;
    this.role = this.tracaList.ROLE;
    // if (!this.tracaList.prodTraca) {
    //   this.enable = true;
    // }

    // this.alertService.observable.subscribe(event => {
    //   this.loadNewAlertComponent(event);
    // });
  }
  tracaDone(event) {
    if (event) {
      this.enable = !this.enable;
      this.tracaList.prodTraca = true;
    }
  }

  // displayAnAlert() {
  //   this.alertService.displayAlert('My first alert is a success', 'success');
  // }
  // createComponent(alertComponent: Type<AlertComponent>) {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(alertComponent);
  //   //console.log(componentFactory);
  //   //console.log(this.alertContainer, alertComponent);
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
