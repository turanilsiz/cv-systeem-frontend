import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule }    from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginService } from './services/login.service';
import { MessageService } from './services/message.service';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { UserCvComponent } from './user-cv/user-cv.component';
import { ManagementComponent } from './management/management.component';
import { MatTableModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatDialogModule} from '@angular/material/dialog';
import { AdduserComponent } from './adduser/adduser.component';
import { UserService } from './services/user.service';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { ManagementService } from './services/management.service';
import { CvpdfService } from './services/cvpdf.service';
import { ValidatorService } from './services/validator.service';
import {MatCardModule} from '@angular/material/card';
import { ExpertiseComponent } from './expertise/expertise.component';
import { PersonelComponent } from './personel/personel.component';
import { EducationComponent } from './education/education.component';
import { TrainingComponent } from './training/training.component';
import { CertificateComponent } from './certificate/certificate.component';
import { LanguageComponent } from './language/language.component';
import { WorkComponent } from './work/work.component';
import { ProjectComponent } from './project/project.component';
import { EditableComponent } from './editable/editable.component';
import { EditModeDirective } from './editable/edit-mode.directive';
import { ViewModeDirective } from './editable/view-mode.directive';
import { EditOnEnterDirective } from './editable/edit-on-enter.directive';
import { FocusableDirective } from './focusable.directive';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


registerLocaleData(localeNl, 'nl');



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    PagenotfoundComponent,
    NavbarComponent,
    UserCvComponent,
    ManagementComponent,
    AdduserComponent,
    ExpertiseComponent,
    PersonelComponent,
    EducationComponent,
    TrainingComponent,
    CertificateComponent,
    LanguageComponent,
    WorkComponent,
    ProjectComponent,
    EditableComponent,
    EditModeDirective,
    ViewModeDirective,
    EditOnEnterDirective,
    FocusableDirective,
    ResetPasswordComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    FormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [LoginService, AuthGuard, MessageService,UserService, MatDatepickerModule, DatePipe, ManagementService, CvpdfService, ValidatorService],
  bootstrap: [AppComponent, ],
  entryComponents:[AdduserComponent]
  
})
export class AppModule { 
  
}

platformBrowserDynamic().bootstrapModule(AppModule);
