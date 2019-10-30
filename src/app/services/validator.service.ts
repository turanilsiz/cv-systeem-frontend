import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { UserService } from './user.service';
import { UsercvService } from './usercv.service';
import { PersonelService } from './personel.service';
import { ExpertiseService } from './expertise.service';
import { EducationService } from './education.service';
import { TrainingService } from './training.service';
import { CertificateService } from './certificate.service';
import { LanguageService } from './language.service';
import { WorkService } from './work.service';
import { ProjectService } from './project.service';




export function validateString(control: AbstractControl){
  let str = control.value;
  if(str.toString().trim().length == 0){
    return {
       validString : true
     }
     return null
  }

}

export function maxLengthOfField(control: AbstractControl){
  let str = control.value;
  console.log(str)
  if(str.toString().length >350){
    return {
       uzunluk : true
     }
     return null
  }

}

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  originalColumnValue : string

  constructor(private usercvService      : UsercvService,
              private personelService    : PersonelService,
              private expertiseService   : ExpertiseService,
              private educationService   : EducationService,
              private trainingService    : TrainingService,
              private certificateService : CertificateService,
              private languageService    : LanguageService,
              private workService        : WorkService,
              private projectService     : ProjectService  
              ) { 

  }
  
  isUserNameExist(value:string, userService:UserService, formGroup:FormGroup){
    userService.users.forEach(usr => {
      if(usr.userName.toLowerCase() == value.toLowerCase().trim()){
        formGroup.controls['userName'].setErrors({'incorrect': true})      
      }
    });
  }

  validateLengthFormGroup(value:string, formGroup:FormGroup, controlName:string, maxLength:number, minLength:number){
    if(maxLength != null && value.length > maxLength){
        formGroup.controls[controlName].setErrors({'maxlength': true}) 
      }
      
    if(minLength != null && value.length < minLength){
      formGroup.controls[controlName].setErrors({'minlength': true}) 
    }
  }
  

  validateLengthFormControl(value:string, formControl:FormControl, maxLength:number, minLength:number){
    if(maxLength != null && value.length > maxLength){
      formControl.setErrors({'maxlength': true}) 
      }
      
    if(minLength != null && value.length < minLength){
      formControl.setErrors({'minlength': true}) 
    }
  }
  
  validateMaxLengthOfTableColumn(value, maxLength:number):boolean{
    let val:string = ''+value
     return val.trim().length > maxLength
  }

  validateMinLengthOfTableColumn(value, minLength:number):boolean{
    let val:string = ''+value
    return val.trim().length < minLength
  }

  isTableColumnEmpty(value):boolean{
    let val:string = ''+value
    return val.trim().length == 0 || val == null
  }
   
  setOriginalColumnValue(value){
    this.originalColumnValue = value
  }

  validateTableColumn(value:string, index:number, fieldName:string, serviceName:string, arrayName:string, maxLength, minLength){
    console.log('maxlength: '+maxLength)
    console.log('minlength: '+minLength)
    if(this.isTableColumnEmpty(value) || this.validateMaxLengthOfTableColumn(value, maxLength) || this.validateMinLengthOfTableColumn(value, minLength)){
      switch(serviceName){
        case 'personelService' :
          this.personelService.characteristics[index][fieldName] = this.originalColumnValue      
          break;

        case 'expertiseService':
            switch(arrayName){
              case 'expertField' :
                this.expertiseService.expertField[index][fieldName]  = this.originalColumnValue
                break;

              case 'progLanguage' : 
                this.expertiseService.progLanguage[index][fieldName] = this.originalColumnValue
                break;

              case 'databases' :
                this.expertiseService.databases[index][fieldName]    = this.originalColumnValue 
                break;
                
              case 'tools' :  
                this.expertiseService.tools[index][fieldName]        = this.originalColumnValue 
                break;

              case 'methodes' :
                this.expertiseService.methodes[index][fieldName]     = this.originalColumnValue   
                break;
                
              case 'frameworks' :
                this.expertiseService.frameworks[index][fieldName]   = this.originalColumnValue   
                break;

              case 'testing' :
                this.expertiseService.testing[index][fieldName]      = this.originalColumnValue   
                break;

              case 'servers' :
                this.expertiseService.servers[index][fieldName]      = this.originalColumnValue   
                break;
                
              case 'ide' :
                this.expertiseService.ide[index][fieldName]          = this.originalColumnValue   
              break;  
            }
          break;
        
        case 'educationService' :
           this.educationService.educations[index][fieldName]    = this.originalColumnValue
           break;

         case 'trainingService' :
           this.trainingService.trainings[index][fieldName]      = this.originalColumnValue
           break;  

         case 'certificateService' :
           this.certificateService.certificates[index][fieldName]= this.originalColumnValue
           break;
         
         case 'languageService' :
            this.languageService.languages[index][fieldName]     = this.originalColumnValue
            break;
         
         case 'workService' :
             this.workService.works[index][fieldName]            = this.originalColumnValue
             break;
             
         case 'projectService' :
             this.projectService.projects[index][fieldName]      = this.originalColumnValue    
          
      }
      
    }
  }

  

}
