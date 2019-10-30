import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CaseListDatasource } from '../case-list-datasource';
import { Language } from '../models/language';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { MatCheckboxChange, } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languages : Language[] = []
  selection = new SelectionModel<Language>(true, []);
  
    languageForm:FormGroup = new FormGroup({
      userLanguage         : new FormControl('',[Validators.required, Validators.maxLength(100)]),
      speak                : new FormControl('',[Validators.required]),
      write                : new FormControl('',[Validators.required]),
      read                 : new FormControl('',[Validators.required]),
    });
    
    //Language
    displayedColumnsLanguage: string[] = ['userLanguage', 'speak','write','read', 'removeLanguage', 'disable'];
    columnsToDisplayLanguage: string[] = this.displayedColumnsLanguage.slice();
    subjectLanguage = new BehaviorSubject(this.languages);
    dataSourceLanguage = new CaseListDatasource(this.subjectLanguage.asObservable());

   constructor() { }

   //Language
   addLanguageToTable(){
    if(this.languageForm.valid){
      this.languages.push(this.languageForm.value);
      this.subjectLanguage.next(this.languages);
      this.dataSourceLanguage = new CaseListDatasource(new BehaviorSubject(this.languages).asObservable());
      this.languageForm.reset();
    }
  }

  removeLanguageFromTable(row){
    this.languages = this.languages.filter(obj => row != obj);
    this.subjectLanguage.next(this.languages);
    this.dataSourceLanguage = new CaseListDatasource(new BehaviorSubject(this.languages).asObservable());
  }

  onCheckboxChagen(event: MatCheckboxChange) {
   
    var idOfCheckedLanguage = +event.source.value['id'];
    this.languages.forEach( lang =>{
         if(lang.id == idOfCheckedLanguage){
           lang.disabled = !lang.disabled
         }
    })
  }

  getValue(row?: Language) {
    return row;
  }
}
