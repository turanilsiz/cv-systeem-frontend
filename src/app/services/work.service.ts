import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CaseListDatasource } from '../case-list-datasource';
import { Work } from '../models/work';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange, } from '@angular/material';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class WorkService {
  
  works : Work[] = []
  selection = new SelectionModel<Work>(true, []);

  workExperienceForm:FormGroup = new FormGroup({
    startDate         : new FormControl('',[Validators.required]),
    endDate           : new FormControl(null),
    function          : new FormControl('',[Validators.required, Validators.maxLength(500)]),
    company           : new FormControl('',[Validators.required, Validators.maxLength(500)]),
  });

  //Work
  displayedColumnsWork: string[] = ['startDate', 'endDate','function','company', 'removeWork', 'disable'];
  columnsToDisplayWork: string[] = this.displayedColumnsWork.slice();
  subjectWork = new BehaviorSubject(this.works);
  dataSourceWork = new CaseListDatasource(this.subjectWork.asObservable());

  
  constructor(private messageService:MessageService) { }

   //Work
   addWorkTable(){
    if(this.workExperienceForm.valid){
      this.works.push(this.workExperienceForm.value);
      this.subjectWork.next(this.works);
      this.dataSourceWork = new CaseListDatasource(new BehaviorSubject(this.works).asObservable());
      this.workExperienceForm.reset();
    }else{
      this.messageService.showFormErrorMessage(this.messageService.messages.get('formDataError'), 'Werkervaring Gegevens', 'error', 'ok', false, this.workExperienceForm)
    }
  }

  removeWorkFromTable(row){
    this.works = this.works.filter(obj=>row != obj);
    this.subjectWork.next(this.works);
    this.dataSourceWork = new CaseListDatasource(new BehaviorSubject(this.works).asObservable());
  }

  onCheckboxChagen(event: MatCheckboxChange) {
   
    var idOfCheckedWork = +event.source.value['id'];
    this.works.forEach( work =>{
         if(work.id == idOfCheckedWork){
           work.disabled = !work.disabled
         }
    })
  }

  getValue(row?: Work) {
    return row;
  }
}
