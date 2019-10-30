import { Component, OnInit } from '@angular/core';
import { PersonelService } from '../services/personel.service';
import { ValidatorService } from '../services/validator.service';
import { ResourceService } from '../services/resource.service';




@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.css']
})
export class PersonelComponent implements OnInit {
 
 
 originalValue : string
  constructor(public personelService  : PersonelService,
              public validatorService : ValidatorService,
              public resourceService  : ResourceService,
               ) { }

  ngOnInit() {

  }

  checkLength(str:string, formName:string, controlName:string, maxValue:number, minValue:number){
        console.log(str)
        switch(formName){
          case 'characteristicForm':
              this.validatorService.validateLengthFormGroup(str, this.personelService.characteristicForm, controlName, maxValue, minValue)     
            break;
         
          case 'personelForm' :
            this.validatorService.validateLengthFormGroup(str, this.personelService.personelForm, controlName, maxValue, minValue)     
            break; 
        }
        
  }

  

   
}
