import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Expertise } from '../models/expertise';
import { BehaviorSubject } from 'rxjs';
import { CaseListDatasource } from '../case-list-datasource';
import { MessageService } from './message.service';
import { ResourceService } from './resource.service';
import { MatCheckboxChange, } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {
  
  selection = new SelectionModel<Expertise>(true, []);

  expertises   : Expertise[]=[]
  expertField  : Expertise[]=[]
  progLanguage : Expertise[]=[]
  databases    : Expertise[]=[]
  tools        : Expertise[]=[]
  methodes     : Expertise[]=[]
  frameworks   : Expertise[]=[]
  testing      : Expertise[]=[]
  servers      : Expertise[]=[]
  ide          : Expertise[]=[]
  columns:string[]=[ 'expertiseType' ,'description', 'expertiseLevel', 'lastYearOfExperience', 'removeExpertise', 'disable']
/*
  displayedColumnsExpertise: string[] = ['expertiseType', 'description', 'expertiseLevel', 'lastYearOfExperience', 'removeExpertise'];
  columnsToDisplayExpertise: string[] = this.displayedColumnsExpertise.slice();
  subjectExpertise = new BehaviorSubject(this.expertises);
  dataSourceExpertise = new CaseListDatasource(this.subjectExpertise.asObservable());*/

  constructor(private messageService : MessageService,
             private resourceService :ResourceService,
             ) { }
  
  //Expertise form
  expertiseForm:FormGroup = new FormGroup({
    //expertiseType         : new FormControl('',[Validators.required]), 
    description           : new FormControl('',[Validators.required, Validators.maxLength(100)]),
    expertiseLevel        : new FormControl('',[Validators.required]),
    lastYearOfExperience  : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
  });
  
  //Expertfield tabel datasource
  displayedColumnsExpertfield: string[] = this.columns
  columnsToDisplayExpertfield: string[] = this.displayedColumnsExpertfield.slice();
  subjectExpertfield                    = new BehaviorSubject(this.expertField);
  dataSourceExpertfield                 = new CaseListDatasource(this.subjectExpertfield.asObservable());

  //PROCESS EXPERTFIELD TABEL

  addExpertfieldToTable(){
    this.dataSourceExpertfield = this.addExpertiseFormToTable(this.expertField ,this.subjectExpertfield, this.resourceService.cvresources.get('expertField'))
  }
  
  removeExpertfieldFromTable(row){
    this.dataSourceExpertfield = this.removeExpertiseFromTable(row, this.expertField, this.subjectExpertfield, this.resourceService.cvresources.get('expertField'))
  }
  
  

  //Programer language tabel datasource
  displayedColumnsProgLanguage: string[] = this.columns
  columnsToDisplayProgLanguage: string[] = this.displayedColumnsProgLanguage.slice();
  subjectProgLanguage                    = new BehaviorSubject(this.progLanguage);
  dataSourceProgLanguage                 = new CaseListDatasource(this.subjectProgLanguage.asObservable());

 //PROCESS PROGRAMMER LANGUAGE TABEL

  addProgrammerLanguageToTable(){
    this.dataSourceProgLanguage = this.addExpertiseFormToTable(this.progLanguage,this.subjectProgLanguage, this.resourceService.cvresources.get('progLanguage'))
  }
  
  removeProgrammerLanguageFromTable(row){
    this.dataSourceProgLanguage = this.removeExpertiseFromTable(row, this.progLanguage, this.subjectProgLanguage, this.resourceService.cvresources.get('progLanguage'))
  }

  //Databese tabel datasource
  displayedColumnsDatabases: string[]    = this.columns
  columnsToDisplayDatabases: string[]    = this.displayedColumnsDatabases.slice();
  subjectDatabases                       = new BehaviorSubject(this.databases);
  dataSourceDatabases                    = new CaseListDatasource(this.subjectDatabases.asObservable());

  //PROCESS DATABESES TABEL
  addDatabeseToTable(){
    this.dataSourceDatabases = this.addExpertiseFormToTable(this.databases,this.subjectDatabases,  this.resourceService.cvresources.get('databases'))
  }
  
  removeDatabeseFromTable(row){
    this.dataSourceDatabases = this.removeExpertiseFromTable(row, this.databases, this.subjectDatabases, this.resourceService.cvresources.get('databases'))
  }

  //Tools tabel datasource
  displayedColumnsTools: string[]    = this.columns
  columnsToDisplayTools: string[]    = this.displayedColumnsTools.slice();
  subjectTools                       = new BehaviorSubject(this.databases);
  dataSourceTools                    = new CaseListDatasource(this.subjectTools.asObservable());

  //PROCESS TOOLS TABEL
  addToolToTable(){
    this.dataSourceTools = this.addExpertiseFormToTable(this.tools,this.subjectTools,  this.resourceService.cvresources.get('tools'))
  }
  
  removeToolFromTable(row){
    this.dataSourceTools = this.removeExpertiseFromTable(row, this.tools, this.subjectTools, this.resourceService.cvresources.get('tools'))
  }


  //Methodes tabel datasource
  displayedColumnsMethodes: string[]     = this.columns
  columnsToDisplayMethodes: string[]     = this.displayedColumnsMethodes.slice();
  subjectMethodes                        = new BehaviorSubject(this.methodes);
  dataSourceMethodes                     = new CaseListDatasource(this.subjectMethodes.asObservable());

  //PROCESS METHODES TABEL
  addMethodeToTable(){
    this.dataSourceMethodes = this.addExpertiseFormToTable(this.methodes,this.subjectMethodes,  this.resourceService.cvresources.get('methodes'))
  }
  
  removeMethodeFromTable(row){
    this.dataSourceMethodes = this.removeExpertiseFromTable(row, this.methodes, this.subjectMethodes, this.resourceService.cvresources.get('methodes'))
  }

  //Frameworks tabel datasource
  displayedColumnsFrameworks: string[]   = this.columns
  columnsToDisplayFrameworks: string[]   = this.displayedColumnsFrameworks.slice();
  subjectFrameworks                      = new BehaviorSubject(this.frameworks);
  dataSourceFrameworks                   = new CaseListDatasource(this.subjectFrameworks.asObservable());

  //PROCESS FRAMEWORKS TABEL
  addFrameworkToTable(){
    this.dataSourceFrameworks = this.addExpertiseFormToTable(this.frameworks,this.subjectFrameworks,  this.resourceService.cvresources.get('frameworks'))
  }
  
  removeFrameworkFromTable(row){
    this.dataSourceFrameworks = this.removeExpertiseFromTable(row, this.frameworks, this.subjectFrameworks, this.resourceService.cvresources.get('frameworks'))
  }

  //Testing tabel datasource
  displayedColumnsTesting: string[]      = this.columns
  columnsToDisplayTesting: string[]      = this.displayedColumnsTesting.slice();
  subjectTesting                         = new BehaviorSubject(this.testing);
  dataSourceTesting                      = new CaseListDatasource(this.subjectTesting.asObservable());

  //PROCESS TESTING TABEL
  addTestingToTable(){
    this.dataSourceTesting = this.addExpertiseFormToTable(this.testing,this.subjectTesting,  this.resourceService.cvresources.get('testing'))
  }
  
  removeTestingFromTable(row){
    this.dataSourceTesting = this.removeExpertiseFromTable(row, this.testing, this.subjectTesting, this.resourceService.cvresources.get('testing'))
  }

  //Servers tabel datasource
  displayedColumnsServers: string[]      = this.columns
  columnsToDisplayServers: string[]      = this.displayedColumnsServers.slice();
  subjectServers                         = new BehaviorSubject(this.servers);
  dataSourceServers                      = new CaseListDatasource(this.subjectServers.asObservable());

  //PROCESS SERVERS TABEL
  addServerToTable(){
    this.dataSourceServers = this.addExpertiseFormToTable(this.servers,this.subjectServers, this.resourceService.cvresources.get('servers'))
  }
  
  removeServerFromTable(row){
    this.dataSourceServers = this.removeExpertiseFromTable(row, this.servers, this.subjectServers, this.resourceService.cvresources.get('servers'))
  }

  //IDE tabel datasource
  displayedColumnsIde: string[]          = this.columns
  columnsToDisplayIde: string[]          = this.displayedColumnsIde.slice();
  subjectIde                             = new BehaviorSubject(this.ide);
  dataSourceIde                          = new CaseListDatasource(this.subjectIde.asObservable());

   //PROCESS IDEs TABEL
   addIdeToTable(){
    this.dataSourceIde = this.addExpertiseFormToTable(this.ide,this.subjectIde, this.resourceService.cvresources.get('ide'))
  }
  
  removeIdeFromTable(row){
    this.dataSourceIde = this.removeExpertiseFromTable(row, this.ide, this.subjectIde, this.resourceService.cvresources.get('ide'))
  }


  addExpertiseFormToTable( expertType:Expertise[], subject:BehaviorSubject<Expertise[]>,  expertiseType:string) : CaseListDatasource{
      if(this.expertiseForm.valid){ 
        expertType.push(this.generateExpertiseObject(this.expertiseForm.value, expertiseType))
        subject.next(expertType)
        this.expertises.push(this.generateExpertiseObject(this.expertiseForm.value, expertiseType))
        return  new CaseListDatasource(new BehaviorSubject(expertType).asObservable())      
        
      }else{
        //this.messageService.showMessage
        return null
      }
      
  }

  removeExpertiseFromTable(row, expertType:Expertise[], subject:BehaviorSubject<Expertise[]>, expertiseType:string) : CaseListDatasource{
     this.removeObjetcFromArray(expertType, row)      
     subject.next(expertType)
     this.removeObjetcFromArray(this.expertises, row)
     return new CaseListDatasource(new BehaviorSubject(expertType).asObservable())
 
  }

  removeObjetcFromArray(expertises:Expertise[], row){
    expertises.forEach( (item, index) => {

      var isObjectsEquels : boolean = item.expertiseType        === row['expertiseType']  &&
                                      item.description          === row['description']    &&
                                      item.expertiseLevel       === row['expertiseLevel'] &&
                                      item.lastYearOfExperience === row['lastYearOfExperience'];
     if(isObjectsEquels) {
       expertises.splice(index,1);
     }
   });
  }

  generateExpertiseObject(formValue, expertiseType1:string):any{
     return  Object.assign({  expertiseType       : expertiseType1 
                          ,   description         : formValue['description']
                          ,   expertiseLevel      : formValue['expertiseLevel'] 
                          ,   lastYearOfExperience: formValue['lastYearOfExperience'] 
                           }
                          );
                                 
  }

  initilazieExepertiseTabels(expertises:Expertise[]){  
    
     if(expertises.length > 0){
      this.initilizeTableDatas([], [], [], [], [], [], [], [], [])
            expertises.forEach(exp=> {
                                       switch(exp.expertiseType){
                                        case this.resourceService.cvresources.get('expertField'):
                                             this.expertField.push(exp)
                                             break;

                                        case this.resourceService.cvresources.get('progLanguage'):
                                             this.progLanguage.push(exp)
                                             break;

                                        case this.resourceService.cvresources.get('databases'):                                           
                                             this.databases.push(exp)
                                             break;

                                        case this.resourceService.cvresources.get('tools'):                                           
                                             this.tools.push(exp)
                                            break;     

                                        case this.resourceService.cvresources.get('methodes'):
                                             this.methodes.push(exp)
                                            break;  
                                        
                                        case this.resourceService.cvresources.get('frameworks'):
                                             this.frameworks.push(exp)
                                             break;
                                            
                                        case this.resourceService.cvresources.get('testing'):
                                            this.testing.push(exp)
                                            break;    

                                        case this.resourceService.cvresources.get('servers'):
                                             this.servers.push(exp)
                                             break; 

                                        case this.resourceService.cvresources.get('ide'):
                                             this.ide.push(exp)
                                             break; 
                                       }
                                        

                                  }
                            );
       this.initilizeTableDatas(this.expertField, this.progLanguage, this.databases,this.tools,  this.methodes, this.frameworks, this.testing, this.servers, this.ide)                                    
     }else{
       this.initilizeTableDatas([], [], [], [], [], [], [], [], [])
     }
      
  }

  initilizeTableDatas(expertField:Expertise[], progLanguage:Expertise[], databases:Expertise[], tools:Expertise[],  methodes:Expertise[], 
                      frameworks:Expertise[], testing:Expertise[], servers:Expertise[], ide:Expertise[]) {

        this.expertField = expertField                
        this.dataSourceExpertfield  = new CaseListDatasource(new BehaviorSubject(expertField).asObservable());

        this.progLanguage = progLanguage
        this.dataSourceProgLanguage = new CaseListDatasource(new BehaviorSubject(progLanguage).asObservable()); 
        
        this.databases = databases
        this.dataSourceDatabases    = new CaseListDatasource(new BehaviorSubject(databases).asObservable());                     
        
        this.tools = tools
        this.dataSourceTools    = new CaseListDatasource(new BehaviorSubject(tools).asObservable());     

        this.methodes = methodes
        this.dataSourceMethodes     = new CaseListDatasource(new BehaviorSubject(methodes).asObservable());                     
        
        this.frameworks = frameworks
        this.dataSourceFrameworks   = new CaseListDatasource(new BehaviorSubject(frameworks).asObservable());  
        
        this.testing = testing
        this.dataSourceTesting      = new CaseListDatasource(new BehaviorSubject(testing).asObservable());  
        
        this.servers =servers
        this.dataSourceServers      = new CaseListDatasource(new BehaviorSubject(servers).asObservable()); 
        
        this.ide = ide
        this.dataSourceIde          = new CaseListDatasource(new BehaviorSubject(ide).asObservable()); 
  }

  onCheckboxChagen(event: MatCheckboxChange) {
    
    var idOfCheckedExpertise = +event.source.value['id'];
    var expertiseType = event.source.value['expertiseType'];
    
    switch(expertiseType){
      case 'Deskundige vaak' || 'Expert field' :
        this.setArrayValue(this.expertField, idOfCheckedExpertise)
        break;

      case 'Programmeertalen' || 'Programming languages' :
        this.setArrayValue(this.progLanguage, idOfCheckedExpertise)
        break;
        
      case 'Databases' :
        this.setArrayValue(this.databases, idOfCheckedExpertise)
        break; 
        
      case 'Tools' :
        this.setArrayValue(this.tools, idOfCheckedExpertise)
        break;
        
      case 'Methodes' :
        this.setArrayValue(this.methodes, idOfCheckedExpertise)
        break;
        
      case 'Frameworks' :
        this.setArrayValue(this.frameworks, idOfCheckedExpertise)
        break;
        
      case 'Testing' :
        this.setArrayValue(this.testing, idOfCheckedExpertise)
        break;
        
      case 'Web / application server' :
        this.setArrayValue(this.servers, idOfCheckedExpertise)
        break;
        
      case 'IDE' :
        this.setArrayValue(this.ide, idOfCheckedExpertise)
        break;  
    }
     
    
  }

  setArrayValue(expertise:Expertise[], idOfCheckedTableColumn:number){
    expertise.forEach( exp =>{
      if(exp.id == idOfCheckedTableColumn){
        exp.disabled = !exp.disabled
      }
    })
  }

  

  getValue(row?: Expertise) {
      return row;
  }

}
