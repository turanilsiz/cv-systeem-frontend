import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Personel } from '../models/personel';
import { BehaviorSubject } from 'rxjs';
import { Characteristic } from '../models/characteristic';
import { CaseListDatasource } from '../case-list-datasource';
import * as _moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange, } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {
  personel        : Personel 
  characteristics : Characteristic[] = [] 
  selection = new SelectionModel<Characteristic>(true, []);


  //Characteristics
  displayedColumnsCharacteristic: string[] = ['characteristic', 'removeCharacteristic', 'disable'];
  columnsToDisplayCharacteristic: string[] = this.displayedColumnsCharacteristic.slice();
  subjectCharacteristic = new BehaviorSubject(this.characteristics);
  dataSourceCharacteristic = new CaseListDatasource(this.subjectCharacteristic.asObservable());

  constructor() { }


  characteristicForm:FormGroup = new FormGroup({
    characteristic : new FormControl('',[Validators.required,]) 
  })



  personelForm:FormGroup = new FormGroup({
    id               : new FormControl(null),
    birthDate        : new FormControl('',[Validators.required,]),
    residence        : new FormControl('',[Validators.required]),
    nationality      : new FormControl('',[Validators.required]),
    hoursAvailabel   : new FormControl('',[Validators.required]),
    currentFunction  : new FormControl('',[Validators.required]),
    itExperienceSince: new FormControl('',[Validators.required]),
    globelProfile    : new FormControl('',[Validators.required]),
  });

  setPersonelForm(personel:Personel){   
    this.personelForm = new FormGroup({
      id               : new FormControl(personel.id),
      birthDate        : new FormControl(personel.birthDate, [Validators.required, ]),
      residence        : new FormControl(personel.residence,[Validators.required]),
      nationality      : new FormControl(personel.nationality,[Validators.required]),
      hoursAvailabel   : new FormControl(personel.hoursAvailabel,[Validators.required]),
      currentFunction  : new FormControl(personel.currentFunction,[Validators.required]),
      itExperienceSince: new FormControl(personel.itExperienceSince,[Validators.required]),
      globelProfile    : new FormControl(personel.globelProfile,[Validators.required]),
    });
  
  }
  


  addCharacteristicToTable(){
    if(this.characteristicForm.valid){
     this.characteristics.push(this.characteristicForm.value)
     this.subjectCharacteristic.next(this.characteristics)
     this.dataSourceCharacteristic = new CaseListDatasource(new BehaviorSubject(this.characteristics).asObservable())
     this.characteristicForm.reset();
    } 
  }
 
  removeCharacteristicFromTable(row){
     this.characteristics = this.characteristics.filter(obj => row != obj )
     this.subjectCharacteristic.next(this.characteristics);  
     this.dataSourceCharacteristic = new CaseListDatasource(new BehaviorSubject(this.characteristics).asObservable());
  } 
  
  onCheckboxChagen(event: MatCheckboxChange) {
   
    var idOfCheckedCharacteristic = +event.source.value['id'];
    this.characteristics.forEach( char =>{
         if(char.id == idOfCheckedCharacteristic){
           char.disabled = !char.disabled
         }
    })
  }

  getValue(row?: Characteristic) {
    return row;
  }

}
