import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Education } from '../models/education';
import { BehaviorSubject } from 'rxjs';
import { CaseListDatasource } from '../case-list-datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange, } from '@angular/material';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  educations : Education[] = []
  selection = new SelectionModel<Education>(true, []);

  //Education
  displayedColumnsEducation: string[] = ['startDate', 'endDate','result', 'education', 'removeEducation', 'disable'];
  columnsToDisplayEducation: string[] = this.displayedColumnsEducation.slice();
  subjectEducation = new BehaviorSubject(this.educations);
  dataSourceEducation = new CaseListDatasource(this.subjectEducation.asObservable());
  

  educationForm:FormGroup = new FormGroup({
    startDate        : new FormControl('',[Validators.required]),
    endDate          : new FormControl('',[Validators.required]),
    result           : new FormControl('',[Validators.required, Validators.maxLength(500)]),
    education        : new FormControl('',[Validators.required, Validators.maxLength(500)]),

  });

  constructor(private messageService:MessageService) { }

   //Education
   addEducationToTable(){
    if(this.educationForm.valid){
      this.educations.push(this.educationForm.value);
      this.subjectEducation.next(this.educations);  
      this.dataSourceEducation = new CaseListDatasource(new BehaviorSubject(this.educations).asObservable());
      this.educationForm.reset();
    }else{
      this.messageService.showFormErrorMessage(this.messageService.messages.get('formDataError'), 'Opleiding Gegevens', 'error', 'ok', false, this.educationForm)
    }
    
  }

  removeEducationFromTable(row){  
    this.educations = this.educations.filter(obj => row != obj )
    this.subjectEducation.next(this.educations);  
    this.dataSourceEducation = new CaseListDatasource(new BehaviorSubject(this.educations).asObservable());
  }

  onCheckboxChagen(event: MatCheckboxChange) {
   
    var idOfCheckedEducation = +event.source.value['id'];
    this.educations.forEach( education =>{
         if(education.id == idOfCheckedEducation){
           education.disabled = !education.disabled
         }
    })
  }

  getValue(row?: Education) {
    return row;
  }

}
