import { Component, OnInit } from '@angular/core';
import { UsercvService } from '../services/usercv.service';
import { BehaviorSubject } from 'rxjs';
import { CaseListDatasource } from '../case-list-datasource';
import { UserCV } from '../models/user-cv';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { CvpdfService } from '../services/cvpdf.service';
import { MessageService } from '../services/message.service';
import { CvwordService } from '../services/cvword.service';
import { ValidatorService } from '../services/validator.service';
import { ResourceService } from '../services/resource.service';
import { ExpertiseService } from '../services/expertise.service';
import { UserService } from '../services/user.service';
import { PersonelService } from '../services/personel.service';
import { EducationService } from '../services/education.service';
import { TrainingService } from '../services/training.service';
import { CertificateService } from '../services/certificate.service';
import { LanguageService } from '../services/language.service';
import { WorkService } from '../services/work.service';
import { ProjectService } from '../services/project.service';

import * as fileSaver from 'file-saver';



export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-user-cv',
  templateUrl: './user-cv.component.html',
  styleUrls: ['./user-cv.component.css'],
  providers:[{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class UserCvComponent implements OnInit {
  
  
  cvLanguages = [
    {value: 'en', viewValue: 'Engels'},
    {value: 'nl', viewValue: 'Nederlands'},
    
  ];

  next:string ='Volgende';
  back:string ='Terug';
  add :string ='Toevoegen';
  //isCvExist:boolean = false
  
  userCv      : UserCV;
  birthDate   : Date; 

  languageLevels =[{value: 'Moedertaal', viewValue: 'Moedertaal'}
                  ,{value: 'Vloeiend'  , viewValue: 'Vloeiend'} 
                  ,{value: 'Goed'      , viewValue: 'Goed'} 
                  ,{value: 'Voldoende' , viewValue: 'Voldoende'} 
                  ,{value: 'Matig'     , viewValue: 'Matig'} 
                  ];

                


  constructor(
             public usercvService      : UsercvService,
             private messageService     : MessageService,
             private cvpdfService       : CvpdfService,
             private cvwordService      : CvwordService,
             private validatorService   : ValidatorService,
             public  resourceService    : ResourceService,
             private expertiseService   : ExpertiseService,
             private personelService    : PersonelService ,
             private educationService   : EducationService,
             private trainingService    : TrainingService,
             private certificateService : CertificateService,
             private languageService    : LanguageService,
             private workService        : WorkService,
             private projectService     : ProjectService,
             public userServcice       : UserService,
             
             ) { }

  ngOnInit() {
    this.usercvService.hideCVcolumn = true;
    this.usercvService.selectedLanguage=null
    this.usercvService.selectedUserId = null
    if(this.userServcice.isAdmin()){
      this.userServcice.nameOfSelectedUser = ''
    }else{
      console.log('else icinde ve username: '+localStorage.getItem('currentUserName'))
      this.userServcice.nameOfSelectedUser = localStorage.getItem('currentUserName')
    }
  }
 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  }
  
  

  //Opslaan gebruikers CV data
  save(){
      this.usercvService.saveUserSave()
  }

  

  downloadPDF(){
    if(this.usercvService.isCvExist){
      this.cvpdfService.downloadUserCVPDF(this.personelService.personel
                                        , this.personelService.characteristics
                                        , this.expertiseService.expertises
                                        , this.educationService.educations
                                        , this.trainingService.trainings
                                        , this.certificateService.certificates
                                        , this.languageService.languages
                                        , this.workService.works
                                        , this.projectService.projects);
    }else{
      this.messageService.showMessage(null, this.messageService.messages.get('emptyCV'), 'error', 'ok', false)
    }
   
  }
  
  downloadWord(){
    this.cvwordService.downloadUserCVWord(this.personelService.personel
                                       ,  this.personelService.characteristics
                                       ,  this.expertiseService.expertises
                                       ,  this.educationService.educations
                                       ,  this.trainingService.trainings
                                       ,  this.certificateService.certificates
                                       ,  this.languageService.languages
                                       ,  this.workService.works
                                       ,  this.projectService.projects
                                        )
      // this.cvwordService.downLoadWord(+localStorage.getItem('currentUserId'), this.usercvService.selectedLanguage)                                  
  }
   
  cvErrorMessage(placeHolder:string, formControlName:string, formName:string){
    switch(formName){
      case 'personelForm':{
        return this.messageService.getErrorMessage(placeHolder, formControlName, this.personelService.personelForm) 
      }
      
      case 'educationForm':{
        return this.messageService.getErrorMessage(placeHolder, formControlName, this.educationService.educationForm)
      }

      case 'trainingForm':{
        return this.messageService.getErrorMessage(placeHolder, formControlName, this.trainingService.trainingForm)
      }

      case 'certificateForm':{
        return this.messageService.getErrorMessage(placeHolder, formControlName, this.certificateService.certificateForm)
      }

      case 'languageForm':{
        return this.messageService.getErrorMessage(placeHolder, formControlName, this.languageService.languageForm)
      }
    }
      
  }

  checkLength(str:string, fomnName:string, controlName:string, maxValue:number, minValue:number){
    switch(fomnName){
      case 'personelForm':{
        this.validatorService.validateLengthFormGroup(str, this.personelService.personelForm, controlName, maxValue, minValue)
      }
      case 'characteristicForm':{
        this.validatorService.validateLengthFormGroup(str, this.personelService.characteristicForm, controlName, maxValue, minValue)
      }
    }
  
  }

  selectCvLanguage(){  
    this.expertiseService.expertises = []
    this.expertiseService.initilizeTableDatas([], [], [], [], [], [], [], [], [])
    this.usercvService.getUserCV(+localStorage.getItem('currentUserId'), this.usercvService.selectedLanguage)
    this.resourceService.initilizeCVResources(this.usercvService.selectedLanguage)
    this.usercvService.hideCVcolumn = false;
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'text/csv; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }
  
  
}
