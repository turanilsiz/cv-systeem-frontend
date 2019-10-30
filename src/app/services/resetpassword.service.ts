import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';
import { HttpClient} from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  resetPassWordForm :FormGroup = new FormGroup({
    //$key :new FormControl(null),
    userName: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',  [Validators.required,]),

  });

  constructor(private http : HttpClient,
             private messageService: MessageService) { }

  getUserWithToken(token:string):Observable<User>{
     return this.http.get<User>(this.messageService.url+'userwithtoken?token='+token);
  } 

  resetPassword():Observable<User>{
    let userName:string = this.resetPassWordForm.value['userName']
    let password:string = this.resetPassWordForm.value['password']
    return this.http.get<User>(this.messageService.url+'resetpassword?userName='+userName+'&password='+password )
    //this.http.post<User>(this.messageService.url+'resetpassword', this.resetPassWordForm)
            /* .subscribe(responseData =>{
               if(responseData){
                console.log('Response Data => ')
                 console.log(responseData)
               }
             })*/
    
  }

}
