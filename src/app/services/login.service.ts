import { Injectable } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { PersonelService } from './personel.service';
import { ExpertiseService } from './expertise.service';
import { EducationService } from './education.service';
import { TrainingService } from './training.service';
import { CertificateService } from './certificate.service';
import { LanguageService } from './language.service';
import { WorkService } from './work.service';
import { ProjectService } from './project.service';
import { ManagementService } from './management.service';
import { UsercvService } from './usercv.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  authenticated =false;

  constructor(private http               : HttpClient,
              private messageService    : MessageService,
              private router             : Router,
              private persoenlService    : PersonelService,
              private expertiseService   : ExpertiseService,
              private educationService   : EducationService,
              private trainingService    : TrainingService,
              private certificateService : CertificateService, 
              private languageService    : LanguageService,
              private workService        : WorkService,
              private projectService     : ProjectService,
              private managementService  : ManagementService,
              private usercvService      : UsercvService) { }

  loginForm :FormGroup = new FormGroup({
    //$key :new FormControl(null),
    userName: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',  [Validators.required,]),

  });
 
  passwordForgettenForm :FormGroup = new FormGroup({
    //$key :new FormControl(null),
    userName: new FormControl('', [Validators.required, Validators.email]),
   // password: new FormControl('',  [Validators.required,]),

  });


  async userAuthenticate(loginFotmData): Promise<any> { 
    if(this.loginForm.valid){
      return await this.http.post<User>(this.messageService.url+"login",loginFotmData).toPromise()                                  
    }       
  }
  
  logout(){
    this.authenticated = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserName');
    this.router.navigate(['/login']);
    this.persoenlService.personelForm.reset()
    this.persoenlService.characteristicForm.reset()
    this.expertiseService.expertiseForm.reset()
    this.educationService.educationForm.reset()
    this.trainingService.trainingForm.reset()
    this.certificateService.certificateForm.reset()
    this.languageService.languageForm.reset()
    this.workService.workExperienceForm.reset()
    this.projectService.projectForm.reset()
    this.managementService.userPhoto = null
    this.usercvService.photoOfSelectedUser = null
  }
  
  checkForResetPassword(){
    if(this.passwordForgettenForm.valid){
      let userName:string = this.passwordForgettenForm.value['userName']
      this.http.get(this.messageService.url+'userbyusername?userName='+userName)
               .subscribe(responseData =>{
                   if(responseData){
                      this.messageService.showMessage(null, this.messageService.messages.get('passwordActivation'), 'info', 'ok', false)
                   }else{
                      this.messageService.showMessage(null, this.messageService.messages.get('userNameNotExists'), 'error', 'ok', false)
                   }
               })
    }else{
      this.messageService.showMessage(null, this.messageService.messages.get('formDataError'), 'error', 'ok', false)
    }
  }

}
