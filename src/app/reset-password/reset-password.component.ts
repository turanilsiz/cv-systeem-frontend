import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ResetpasswordService } from '../services/resetpassword.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  title:string = 'DPA Geos CV Systeem'
  token:string
  isTokenValid:boolean = false
  goLogInPage:boolean = false
  constructor(private route: ActivatedRoute
            , public resetPasswordService: ResetpasswordService
            , private router: Router) { 
   
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      this.token = params['token']
    })  
    this.findUserWithToken(this.token)
  }
  
  findUserWithToken(token:string){
    this.resetPasswordService.getUserWithToken(token)
                             .subscribe(responseData =>{
                                 if(responseData){
                                   this.isTokenValid = true
                                   this.resetPasswordService.resetPassWordForm.controls['userName'].setValue(responseData['userName'])
                                 }else{
                                  this.isTokenValid = false
                                 }
                             })
  }

  resetPassword(){
    this.resetPasswordService.resetPassword()
                             .subscribe(responseData=>{
                                            if(responseData){
                                              this.goLogInPage = true
                                            }
                             })
  }

  
  goToLogInPage (){
    this.router.navigate(['/login'])
  }

}
