import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OperatorComponent } from './operator/operator.component';
import { ScanInputComponent } from './operator/scan-input/scan-input.component';
import { ProdProcessComponent } from './operator/prod-process/prod-process.component';
import { PartInfoComponent } from './operator/prod-process/part-info/part-info.component';
import { FlowComponent } from './operator/prod-process/flow/flow.component';
import { SubProcessComponent } from './operator/prod-process/sub-process/sub-process.component';
import { SubOperationComponent } from './operator/prod-process/sub-operation/sub-operation.component';
import { TracaComponent } from './operator/prod-process/sub-operation/traca/traca.component';
import { MaterialComponent } from './operator/prod-process/sub-operation/traca/material/material.component';
import { AutocontroleComponent } from './operator/prod-process/sub-operation/traca/autocontrole/autocontrole.component';
import { WorkorderComponent } from './operator/prod-process/sub-operation/traca/workorder/workorder.component';
import { CalageComponent } from './operator/prod-process/sub-operation/traca/calage/calage.component';
import { ThicknessComponent } from './operator/prod-process/sub-operation/traca/thickness/thickness.component';
import { InstructionComponent } from './operator/prod-process/sub-operation/instruction/instruction.component';
import { UserbarComponent } from './userbar/userbar.component';
import { LoginComponent } from './login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StatusTrioComponent } from './tools/status-trio/status-trio.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AlertComponent } from './alert/alert.component';
import { OperationGroupComponent } from './operator/prod-process/sub-process/operation-group/operation-group.component';
import { SubOpeGroupComponent } from './operator/prod-process/sub-process/operation-group/sub-ope-group/sub-ope-group.component';
import { ControlCardComponent } from './operator/prod-process/sub-operation/traca/thickness/control-card/control-card.component';
import { ChartsModule } from 'ng2-charts';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrcodeComponent } from './tools/qrcode/qrcode.component';
import { PreparateurComponent } from './preparateur/preparateur.component';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { MatTableModule } from '@angular/material/table';
import { ProcessListComponent } from './preparateur/process-list/process-list.component';
import { ProcessComponent } from './preparateur/process/process.component';
import { OperationComponent } from './preparateur/operation/operation.component';
import { GroupComponent } from './preparateur/group/group.component';
import { SubOpeComponent } from './preparateur/sub-ope/sub-ope.component';
import { TechDataComponent } from './preparateur/tech-data/tech-data.component';
import { EditInstructionComponent } from './preparateur/edit-instruction/edit-instruction.component';
import { EditTracaComponent } from './preparateur/edit-traca/edit-traca.component'
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { GestContentComponent } from './gestionnaire/gest-content/gest-content.component';
import { GestNavBarComponent } from './gestionnaire/gest-nav-bar/gest-nav-bar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './shared/header/header.component';
import { GestPeComponent } from './gestionnaire/gest-content/gest-pe/gest-pe.component';
import { GestAssyComponent } from './gestionnaire/gest-content/gest-assy/gest-assy.component';
import { StickersComponent } from './shared/print/stickers/stickers.component';
@NgModule({
  declarations: [
    AppComponent,
    OperatorComponent,
    ScanInputComponent,
    ProdProcessComponent,
    PartInfoComponent,
    FlowComponent,
    SubProcessComponent,
    SubOperationComponent,
    TracaComponent,
    MaterialComponent,
    AutocontroleComponent,
    WorkorderComponent,
    CalageComponent,
    ThicknessComponent,
    InstructionComponent,
    UserbarComponent,
    LoginComponent,
    StatusTrioComponent,
    HomeComponent,
    AlertComponent,
    OperationGroupComponent,
    SubOpeGroupComponent,
    ControlCardComponent,
    QrcodeComponent,
    PreparateurComponent,
    GestionnaireComponent,
    ProcessListComponent,
    ProcessComponent,
    OperationComponent,
    GroupComponent,
    SubOpeComponent,
    TechDataComponent,
    EditInstructionComponent,
    EditTracaComponent,
    GestContentComponent,
    GestNavBarComponent,
    HeaderComponent,
    GestPeComponent,
    GestAssyComponent,
    StickersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ChartsModule,
    NgxQRCodeModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
