import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourceService } from '../services/resource.service';
import { ExpertiseService } from '../services/expertise.service';
import { ValidatorService } from '../services/validator.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent implements OnInit  {

  selectedIndex:number = 0
  expertiseTypeValue:string = this.resourceService.cvresources.get('expertField')


  constructor(public resourceService  : ResourceService,
              public expertiseService : ExpertiseService,
              public validatorService : ValidatorService,
              private messageService  : MessageService
             ) { }

  ngOnInit() {
                                      
    }
  
   
   
   stepperClicked(event){
    this.selectedIndex = event.selectedIndex 

    switch(this.selectedIndex){
      case 0 :
        this.expertiseTypeValue = this.resourceService.cvresources.get('expertField')
        break;
      
      case 1:
        this.expertiseTypeValue = this.resourceService.cvresources.get('progLanguage')
        break;
      
      case 2:
        this.expertiseTypeValue = this.resourceService.cvresources.get('databases')  
        break;

      case 3:
        this.expertiseTypeValue = this.resourceService.cvresources.get('tools')  
          break;  
        
      case 4:
        this.expertiseTypeValue = this.resourceService.cvresources.get('methodes')
        break;
        
      case 5:
        this.expertiseTypeValue = this.resourceService.cvresources.get('frameworks')
        break;  
      
      case 6:
        this.expertiseTypeValue = this.resourceService.cvresources.get('testing')
        break;
        
      case 7:
        this.expertiseTypeValue = this.resourceService.cvresources.get('servers')
        break;
      
      default:
        this.expertiseTypeValue = this.resourceService.cvresources.get('ide')
        break;  
    } 
  }

  addExpertiseToTable(){

    if(this.expertiseService.expertiseForm.valid){
      switch(this.selectedIndex){
        case 0 :
          this.expertiseService.addExpertfieldToTable()
          break;
        
        case 1:
          this.expertiseService.addProgrammerLanguageToTable()
          break;
        
        case 2:
          this.expertiseService.addDatabeseToTable()  
          break;
        
        case 3:
          this.expertiseService.addToolToTable()  
            break;
  
        case 4:
          this.expertiseService.addMethodeToTable()
          break;
          
        case 5:
          this.expertiseService.addFrameworkToTable()
          break;  
        
        case 6:
          this.expertiseService.addTestingToTable()
          break;
          
        case 7:
          this.expertiseService.addServerToTable()
          break;
        
        default:
          this.expertiseService.addIdeToTable()
          break;  
      }
      this.expertiseService.expertiseForm.reset()
    }else{
      this.messageService.showFormErrorMessage(this.messageService.messages.get('formDataError'), 'Expertise Gegevens', 'error', 'ok', false, this.expertiseService.expertiseForm)
    }
       
  }
  
  
   
}
