import { Injectable, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { MessageService } from './message.service';
import { validateString } from './validator.service';




@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  userPhoto:string="";
  
  constructor(private http:HttpClient,
              private messageService:MessageService,
             ) { }

  managementForm :FormGroup = new FormGroup({
    //$key :new FormControl(null),
    //id       : new FormControl(null),
    userName      : new FormControl('', [Validators.required, Validators.email, validateString]),
    password      : new FormControl(null),
    acedemicTitle : new FormControl(null),
    initial       : new FormControl(null),
    firstName     : new FormControl('',  [Validators.required, validateString]), 
    insertion     : new FormControl(null), 
    lastName      : new FormControl('',  [Validators.required, validateString]),

  });

  getUserByUserId(){
      this.http.get<User>(this.messageService.url+"user?id="+localStorage.getItem('currentUserId'), this.messageService.requestHeader)
                         .subscribe(responseDate => this.setValeForManagementForm(responseDate),
                                    error        => this.messageService.showMessage(null, error.message, 'error', 'ok', false)
                                   )                               
  }

  setValeForManagementForm(user:User){
    this.userPhoto = user.photo
    this.managementForm = new FormGroup({
      id            : new FormControl(user.id),
      userName      : new FormControl(user.userName.trim() , [Validators.required, Validators.email, validateString]),
      password      : new FormControl(user.password),
      acedemicTitle : new FormControl(user.acedemicTitle),
      initial       : new FormControl(user.initial), 
      firstName     : new FormControl(user.firstName.trim(), [Validators.required, validateString]),
      insertion     : new FormControl(user.insertion), 
      lastName      : new FormControl(user.lastName.trim() , [Validators.required, validateString]),
    
    });
  }

  updateUserData(userPhoto:File){
    if(this.managementForm.valid){
      this.http.post<User>(this.messageService.url+"updateuser", this.managementForm.value, this.messageService.requestHeader)
      .subscribe(responseData => {if(responseData){ 
                                    //this.setValeForManagementForm(responseData)
                                    }                                        
                                  this.messageService.showMessage(null, this.messageService.messages.get('saveData'), 'success', 'ok', false) 
                                },
                 error       => this.messageService.showMessage(this.messageService.messages.get('saveDataError'), error.message, 'error', 'ok', false)                                    
               );
      if(userPhoto != null){         
                            this.http.post<User>(this.messageService.url+"addphoto", this.convertObjectToEntity(userPhoto), this.messageService.requestHeader)
                                                  .subscribe(responseData => {if(responseData){ this.setValeForManagementForm(responseData)
                                                                                                 console.log('Image has been saved..')
                                                                                              }
                                                                              },
                                                             error        =>  this.messageService.showMessage(this.messageService.messages.get('saveDataError'), error.message, 'error', 'ok', false)                                    
                                     )   
                          }      
    }else{
      this.messageService.showMessage(null, this.messageService.messages.get('formDataError'), 'error', 'ok', false)
    }
      
  } 

  convertObjectToEntity(file:File):FormData{

    const fd =new FormData();   
    fd.append('file', file, file.name)   
    fd.append('id'  , localStorage.getItem('currentUserId'))  
    
    return fd;
  }
}
