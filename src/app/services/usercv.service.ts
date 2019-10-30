import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Personel } from '../models/personel';
import { Education } from '../models/education';
import { Training } from '../models/training';
import { Certificate } from '../models/certificate';
import { Language } from '../models/language';
import { Project } from '../models/project';
import { Work } from '../models/work';
import { UserCV } from '../models/user-cv';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { MessageService } from './message.service';

import { Characteristic } from '../models/characteristic';
import { Expertise } from '../models/expertise';
import { PersonelService } from './personel.service';
import { EducationService } from './education.service';
import { TrainingService } from './training.service';
import { CertificateService } from './certificate.service';
import { LanguageService } from './language.service';
import { ProjectService } from './project.service';
import { WorkService } from './work.service';
import { ExpertiseService } from './expertise.service';
import { CaseListDatasource } from '../case-list-datasource';








@Injectable({
  providedIn: 'root'
})
export class UsercvService {
   birthDateMoment     : Moment
   hideCVcolumn        : boolean = true
   selectedLanguage    : string
   userCv              : UserCV
   isCvExist           : boolean = false
   selectedUserId      : number
   photoOfSelectedUser : string =""
   showUserPhotoInCV : boolean = true
   

  constructor(private http:HttpClient,
             private messageService     : MessageService    ,
             private personelService    : PersonelService   ,
             private educationService   : EducationService  ,
             private trainingService    : TrainingService   ,
             private certificateService : CertificateService,
             private languageService    : LanguageService   ,
             private projectService     : ProjectService    ,
             private workService        : WorkService       ,
             private expertiseService   : ExpertiseService,
             
             ) { }
           
  
  
  setVisibilityOfUserPhotoInCv(){
  this.showUserPhotoInCV = !this.showUserPhotoInCV
  }

 /* getUserCV(userId:number, selectedLanguage:string):Observable<UserCV>{
    return this.http.get<UserCV>(this.messageService.url+"getusercv?userid="+userId+"&selectedLanguage="+selectedLanguage, this.messageService.requestHeader);
  }*/

  async getUserCvAsync(userId:number):Promise<UserCV>{
    return await this.http.get<UserCV>(this.messageService.url+"getusercv?userid="+userId, this.messageService.requestHeader).toPromise();
  }
  
  saveUserCV(userCv:UserCV):Observable<UserCV>{
   return this.http.post<UserCV>(this.messageService.url+"usercv",userCv, this.messageService.requestHeader)
  }

  genrateUserCVEntity(currentUserId:number
                    , selectedLanguage:string
                    , personel:Personel
                    , educations:Education[]
                    , trainings:Training[]
                    , certicates:Certificate[] 
                    , languages: Language[]
                    , works:Work[]
                    , projects:Project[]
                    , characteristic:Characteristic[]
                    , expertises:Expertise[]
                    ) :UserCV{
                      this.convertMomentToDate(personel);
                      if(this.selectedUserId != null){
                        currentUserId = this.selectedUserId
                      }
                      
   return new UserCV(currentUserId
                         , selectedLanguage
                        ,  personel
                        ,  educations
                        ,  trainings
                        ,  certicates
                        ,  languages
                        ,  works
                        ,  projects
                        ,  characteristic
                        ,  expertises
                        );


  }

  convertMomentToDate(personel:Personel){
    personel['birthDate'] = new Date(_moment(personel.birthDate).format()); 
  }

  
  
  
  getUserCV(userId:number,selectedLanguage:string){
 
    if(this.selectedUserId){
        userId = this.selectedUserId
    }
     
    this.http.get<UserCV>(this.messageService.url+"getusercv?userid="+userId+"&selectedLanguage="+selectedLanguage, this.messageService.requestHeader)
    .subscribe(responseData => { if(responseData){ 
                                    this.convertUserCVToEntities(responseData);
                                    
                                  }
                              }
            ,  error => this.messageService.showMessage(this.messageService.messages.get('showDataError'), error.message, 'error', 'ok', false)
              )  
  }

  
  saveUserSave(){
    if(this.personelService.personelForm.valid){
   
      this.userCv = this.genrateUserCVEntity(+localStorage.getItem('currentUserId')
                                                          ,  this.selectedLanguage
                                                          ,  this.personelService.personelForm.value
                                                          ,  this.educationService.educations
                                                          ,  this.trainingService.trainings
                                                          ,  this.certificateService.certificates
                                                          ,  this.languageService.languages
                                                          ,  this.workService.works
                                                          ,  this.projectService.projects        
                                                          ,  this.personelService.characteristics
                                                          ,  this.expertiseService.expertises
                                                          );

      this.saveUserCV(this.userCv)
                .subscribe(responseData =>  { if(responseData){ this.convertUserCVToEntities(responseData);
                                                                this.messageService.showMessage(null, this.messageService.messages.get('saveData'), 'success', 'ok', false)   
                                                              }
                                            },
                          error         =>  this.messageService.showMessage(this.messageService.messages.get('saveDataError'), error.message, 'error', 'ok', false)
                          )  
}else{   
  this.messageService.showFormErrorMessage(this.messageService.messages.get('formDataError'), 'Persoonlijke Gegevens', 'error', 'ok', false, this.personelService.personelForm)
}
    
  }

  convertUserCVToEntities(userCv:UserCV){

    this.photoOfSelectedUser = userCv['userPhoto']
    if(userCv['personel'] != null){
      this.personelService.setPersonelForm(userCv['personel']);
      this.personelService.personel  = userCv['personel'];
      this.isCvExist = true
    }else{     
      this.personelService.personelForm.reset();
      this.personelService.personel = null;
      this.isCvExist = false
    }
    
    this.personelService.characteristics = userCv['characteristic']
    this.personelService.dataSourceCharacteristic = new CaseListDatasource(new BehaviorSubject(this.personelService.characteristics).asObservable());

    this.educationService.educations  = userCv['educations'];
    this.educationService.dataSourceEducation = new CaseListDatasource(new BehaviorSubject(this.educationService.educations).asObservable());

    this.trainingService.trainings    = userCv['trainings'];
    this.trainingService.dataSourceTraining = new CaseListDatasource(new BehaviorSubject(this.trainingService.trainings).asObservable());

    this.certificateService.certificates = userCv['certificates'];
    this.certificateService.dataSourceCertificate = new CaseListDatasource(new BehaviorSubject(this.certificateService.certificates).asObservable());

    this.languageService.languages    = userCv['languages'];
    this.languageService.dataSourceLanguage = new CaseListDatasource(new BehaviorSubject(this.languageService.languages).asObservable());

    this.projectService.projects     = userCv['projects'];
    this.projectService.dataSourceProject = new CaseListDatasource(new BehaviorSubject(this.projectService.projects).asObservable());

    this.workService.works        = userCv['works'];
    this.workService.dataSourceWork = new CaseListDatasource(new BehaviorSubject(this.workService.works).asObservable());

    this.expertiseService.expertises = userCv['expertises'];
    this.expertiseService.initilazieExepertiseTabels(this.expertiseService.expertises)
    
  }

  
}
