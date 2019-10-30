import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

import { MessageService } from '../services/message.service';

import { ValidatorService } from '../services/validator.service';




@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {



  roles = [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'USER', viewValue: 'USER'},
  ];;

  active=[{value:'1', viewValue:'Ja'},
          {value:'0', viewValue:'Nee'}]



  constructor(public userService       : UserService,
              private messageService   : MessageService,            
              private dialogRef        : MatDialogRef<AdduserComponent>,
              private validatorService : ValidatorService) {  }

  ngOnInit() {
   
  }
  
  

  onSubmit() {
    if (this.userService.userForm.valid) {
      this.userService.adduser(this.userService.userForm.value, localStorage.getItem('currentUserName'))
        .subscribe(responseData => {
          if (responseData) {          
            this.userService.getAllUser().subscribe(responseData => this.userService.users = responseData)           
            this.closeDiolog();
            this.userService.userForm.reset();
            this.messageService.showMessage(null, this.messageService.messages.get('userAdded'),'success', 'ok', false)            
          } 
        },
          error => { 
                    this.messageService.showMessage(this.messageService.messages.get('userAddError'), error.message, 'error', 'ok', false)          
                   })
    }else{ 
      this.messageService.showMessage(null, this.messageService.messages.get('formDataError'), 'error', 'ok', false)          
    }

  }

  

  closeDiolog(){
    this.dialogRef.close();
    this.userService.resetUserForm();
  }

  onClear(){
    this.userService.resetUserForm();
  }


  checkUsername(value:string){
    this.validatorService.isUserNameExist(value, this.userService, this.userService.userForm) 
  }

  
  addUserErrorMessage(placeHolder:string, formControlName:string) {
    return this.messageService.getErrorMessage(placeHolder, formControlName, this.userService.userForm)                
  }
 
}
