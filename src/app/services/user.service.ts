import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MessageService } from './message.service';
import {validateString,} from './validator.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User;
  users:User[]=[];
  nameOfSelectedUser:string

  userForm :FormGroup = new FormGroup({
    //$key :new FormControl(null),
    id: new FormControl(null),
    userName :new FormControl('',[Validators.required, Validators.email, validateString, ]),
    password :new FormControl('',[Validators.required, validateString]),
    acedemicTitle : new FormControl(null),
    initial       : new FormControl(null),
    firstName:new FormControl('',[Validators.required, validateString]),
    insertion     : new FormControl(null), 
    lastName :new FormControl('',[Validators.required, validateString]),
    startDate:new FormControl('',[Validators.required]),
    role     :new FormControl('',[Validators.required,]),
    active   :new FormControl('',[Validators.required]),
   
  });
  
  

  constructor(private http:HttpClient,
              private messageService:MessageService,
            ) { }
  
  isAdmin():boolean{
     return localStorage.getItem('role') ==='ADMIN';
  }

  
  
  getAllUser():Observable<User[]>{
     return this.http.get<User[]>(this.messageService.url+"users?id="+localStorage.getItem('currentUserId'), this.messageService.requestHeader);
  }

  adduser(formData, createdBy:string):Observable<User>{ 
       
     return this.http.post<User>(this.messageService.url+"registration", this.formDataToUser(formData,createdBy), this.messageService.requestHeader);
  }
  
  formDataToUser(formData, createdBy:string):User{
    let usr = new User(Object(formData)["id"]
    , Object(formData)["userName"]
    , Object(formData)["password"]
    , Object(formData)["acedemicTitle"]
    , Object(formData)["initial"]
    , Object(formData)["firstName"]
    , Object(formData)["insertion"]
    , Object(formData)["lastName"]    
    , Object(formData)["startDate"] 
    , createdBy
    , Object(formData)["role"] 
    , Object(formData)["active"]  
    , Object(formData)["latestCVupdate"]   
    , Object(formData)["cvupdatedBy"]               
    );

    return usr;
  }

   deleteUser(row?:User){
    this.http.delete<number>(this.messageService.url+"deleteuser?id="+row.id, this.messageService.requestHeader)
             .subscribe(()    => { this.messageService.showMessage( this.messageService.messages.get('deleted'),
                                                                    this.messageService.messages.get('deleteUserSucces'),
                                                                    'success',
                                                                    'ok',
                                                                    false  
                                                                  )
                                   this.users = this.users.filter(obj => obj !== row);        
                                 },
                        error => { this.messageService.showMessage( this.messageService.messages.get('deleteUserError'),
                                                                    error.message,
                                                                    'error',
                                                                    'ok',
                                                                    false
                                                                  )         
                                 }
                      )
                      
     
  }
 
  
  populateFormForUserUpdate(user?:User){
    //this.removeElements(user);
    this.userForm.setValue(user);
  }

  removeElements(user:User){
    delete user.userName;
    delete user.password;
    delete user.createdBy;
    delete user.creationDateTime;
    delete user.role;
    delete user.photo;
    delete user.lastTimeInlog;

  }

  resetUserForm(){
    this.userForm.setValue({
      id       : '',
      userName : '',
      password : '',
      firstName: '',
      lastName : '',
      startDate: '',
      role     : '',
      active   : '',
      acedemicTitle :'',
      initial : '',
      insertion : '',
    })
  }

 
}
