import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CaseListDatasource } from '../case-list-datasource';
import { Project } from '../models/project';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange, } from '@angular/material';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  projects : Project[] = []
  selection = new SelectionModel<Project>(true, []);

  //Project
  displayedColumnsProject: string[] = ['startDate', 'endDate','projectName','client', 'role', 'activity', 'tools', 'removeProject', 'disable'];
  columnsToDisplayProject: string[] = this.displayedColumnsProject.slice();
  subjectProject = new BehaviorSubject(this.projects);
  dataSourceProject = new CaseListDatasource(this.subjectProject.asObservable());


  projectForm:FormGroup = new FormGroup({
    startDate         : new FormControl('',[Validators.required]),
    endDate           : new FormControl(null),
    projectName       : new FormControl('',[Validators.required, Validators.maxLength(500)]),
    client            : new FormControl('',[Validators.required, Validators.maxLength(500)]),
    role              : new FormControl('',[Validators.required, Validators.maxLength(500)]),
    activity          : new FormControl('',[Validators.required, Validators.maxLength(2000)]),
    tools             : new FormControl('',[Validators.required, Validators.maxLength(2000)]),
  });

  constructor(private messageService:MessageService) { }

   //Projects
   addProjectToTable(){
    if(this.projectForm.valid){
      this.projects.push(this.projectForm.value)
      this.subjectProject.next(this.projects);
      this.dataSourceProject = new CaseListDatasource(new BehaviorSubject(this.projects).asObservable());
      this.projectForm.reset();
    }else{
      this.messageService.showFormErrorMessage(this.messageService.messages.get('formDataError'), 'Projectervaring Gegevens', 'error', 'ok', false, this.projectForm)
    }

  }

  removeProjectFromTable(row){
      this.projects = this.projects.filter(obj=> row!=obj);
      this.subjectProject.next(this.projects);
      this.dataSourceProject = new CaseListDatasource(new BehaviorSubject(this.projects).asObservable());
  }

  onCheckboxChagen(event: MatCheckboxChange) {
   
    var idOfCheckedProject = +event.source.value['id'];
    this.projects.forEach( project =>{
         if(project.id == idOfCheckedProject){
           project.disabled = !project.disabled
         }
    })
  }

  getValue(row?: Project) {
    return row;
  }
}
