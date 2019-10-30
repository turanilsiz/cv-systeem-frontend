import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  title = 'DPA Geos CV Systeem'

  routes=[
    {linkName:'Gebruikers', url:'/user'},
    {linkName:'Beheer', url:'/management'},
    
  
  ];
  
  constructor(public loginService:LoginService
           ,  private userService:UserService
            ) { }

  ngOnInit() {
    this.setRoutes();
  }
  
  setRoutes(){
    if(!this.userService.isAdmin()){
        this.routes = [//{linkName:'Gebruikers', url:'/user'},
        {linkName:'Mijn CV', url:'/user-cv'},
        {linkName:'Beheer', url:'/management'},]
    }

  }

  logout(){
    this.loginService.logout();
  }
  

}
