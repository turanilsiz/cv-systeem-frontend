import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
import { UserCvComponent } from './user-cv/user-cv.component';
import { ManagementComponent } from './management/management.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



const routes: Routes = [
  {path:''          , redirectTo:'/login', pathMatch:'full'}  ,
  {path:'login'     , component:LoginComponent},
  {path:'reset'     , component:ResetPasswordComponent},
  {path:'user'      , component:UserComponent, canActivate:[AuthGuard]},
  {path:'user-cv'   , component:UserCvComponent,canActivate:[AuthGuard]},
  {path:'management', component:ManagementComponent, canActivate:[AuthGuard]},
  {path:'**'        , component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
