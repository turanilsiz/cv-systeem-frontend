import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: User;
  hide = true;
  title= 'DPA Geos CV Systeem'
  isPasswordForgetten:boolean = false
 
  constructor(public  loginService:LoginService,
              private messageService: MessageService,
              private  router: Router,) { }

  ngOnInit() {
  }

  passWordForgetten(){
    this.isPasswordForgetten = !this.isPasswordForgetten  
    this.loginService.passwordForgettenForm.reset()  
  }
  
  async logIn(){
    let data = await this.loginService.userAuthenticate(this.loginService.loginForm.value)
    if(data!= null){
      this.messageService.token = data['token']
      this.currentUser = data['user'];
      this.loginService.authenticated = true; 
      this.messageService.requestHeader = {
                                    headers: new HttpHeaders()
                                    .set('Authorization',  'Bearer '+data['token'])
                                    .set('Contetnt-Type','multipart/form-data')
                                  }
      localStorage.setItem('currentUserId', ""+this.currentUser.id)
      localStorage.setItem('currentUserName', this.currentUser.firstName+" "+this.currentUser.lastName )
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      localStorage.setItem('token', JSON.stringify(data["token"]));
      localStorage.setItem('role', this.currentUser.role);
      if(this.currentUser.role == 'ADMIN'){
        this.router.navigate(['/user'])
      }else{
        this.router.navigate(['/user-cv'])
      }
      
      this.loginService.loginForm.reset()
    }else{
      this.messageService.showMessage(null, this.messageService.messages.get('loginError'),'error','ok',false)        
    }
           
  }

  loginErrorMessage(placeHolder:string, formControlName:string){
    return this.messageService.getErrorMessage(placeHolder, formControlName, this.loginService.loginForm)      
  }
  
  resetPasswordErrorMessage(placeHolder:string, formControlName:string){
    return this.messageService.getErrorMessage(placeHolder, formControlName, this.loginService.passwordForgettenForm)       
  }
  
}
