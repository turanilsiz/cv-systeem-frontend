import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CaseListDatasource } from '../case-list-datasource';
import { Training } from '../models/training';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange, } from '@angular/material';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  trainings : Training[] = []
  selection = new SelectionModel<Training>(true, []);

  //Training
  displayedColumnsTraining: string[] = ['year', 'institute','training', 'removeTraining', 'disable'];
  columnsToDisplayTraining: string[] = this.displayedColumnsTraining.slice();
  subjectTraining = new BehaviorSubject(this.trainings);
  dataSourceTraining = new CaseListDatasource(this.subjectTraining.asObservable());

  trainingForm:FormGroup = new FormGroup({
    year             : new FormControl('',[Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
    institute        : new FormControl('',[Validators.required, Validators.maxLength(500)]),
    training         : new FormControl('',[Validators.required, Validators.maxLength(500)]),
  });

  constructor(private messageService:MessageService) { }

   //Training
   addTrainingToTable(){
    if(this.trainingForm.valid){
      this.trainings.push(this.trainingForm.value);
      this.subjectTraining.next(this.trainings);
      this.dataSourceTraining = new CaseListDatasource(new BehaviorSubject(this.trainings).asObservable());
      this.trainingForm.reset();
    }else{
     this.messageService.showFormErrorMessage(this.messageService.messages.get('formDataError'), 'Persoonlijke Gegevens', 'error', 'ok', false, this.trainingForm)
    }

  }

  removeTrainingFromTable(row){
    this.trainings= this.trainings.filter(obj => row != obj);
    this.subjectTraining.next(this.trainings);
    this.dataSourceTraining = new CaseListDatasource(new BehaviorSubject(this.trainings).asObservable());
  }

  onCheckboxChagen(event: MatCheckboxChange) {
   
    var idOfCheckedTraining = +event.source.value['id'];
    this.trainings.forEach( training =>{
         if(training.id == idOfCheckedTraining){
           training.disabled = !training.disabled
         }
    })
  }

  getValue(row?: Training) {
    return row;
  }

}
