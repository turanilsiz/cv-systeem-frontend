import { HostListener, Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router, NavigationStart } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { Subscription } from 'rxjs';



export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  subscription : Subscription;
  constructor(public loginService: LoginService
            , private router      : Router
            , location            : PlatformLocation){  
              location.onPopState(() => {              
                   this.router.navigate(['/login'])
                   this.loginService.authenticated = false;                  
              });   
             
             let url  :string = window.location.href.replace('http://localhost:4200/','')   
             let userToken:string =  url.substring(url.indexOf('=')+1)
                             
             if(url.startsWith('/reset?token=') || url.startsWith('reset')){
              this.router.navigate(['/reset'], { queryParams: { token: userToken } })
             }else{
              this.router.navigate(['/login'])
             }  
             
             router.events.subscribe((event) => {
              if (event instanceof NavigationStart) {
                browserRefresh = !router.navigated;         
               }
               
            });
            /*if(browserRefresh && location.pathname !== '/'){
              console.log('path'+location.pathname)
              this.router.navigate([location.pathname])
            }*/

          
  }

  ngOnInit(){
     
  }

  
}
