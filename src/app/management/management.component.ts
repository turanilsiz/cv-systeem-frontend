import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { MessageService } from '../services/message.service';
import { ValidatorService } from '../services/validator.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
  
})
export class ManagementComponent implements OnInit {
  selectedFile:File=null;
  hide = true;
  constructor(public  managementService: ManagementService,
              private messageService   : MessageService,
              public  userService      : UserService,
              private validatorService : ValidatorService) { }

  ngOnInit() {
    this.managementService.getUserByUserId();
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]; 
    let reader = new FileReader(); 
    reader.onload = this.handleFile.bind(this);
    reader.readAsBinaryString(this.selectedFile);    
  }
  
  handleFile(event) {
    var binaryString = event.target.result;
    this.managementService.userPhoto= "data:image/jpeg;base64,"+btoa(binaryString);
   }
  
 
  updateUser(){
     this.managementService.updateUserData(this.selectedFile);
  }

  checkUsername(value:string){
    this.validatorService.isUserNameExist(value, this.userService, this.managementService.managementForm)
  }

  managementErrorMessage(placeHolder:string, formControlName:string){
    return this.messageService.getErrorMessage(placeHolder, formControlName, this.managementService.managementForm)   
  }
}
