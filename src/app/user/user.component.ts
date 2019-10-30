import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { MatDialog, MatDialogConfig, MatCheckboxChange, } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { AdduserComponent } from '../adduser/adduser.component';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { CvpdfService } from '../services/cvpdf.service';
import { UsercvService } from '../services/usercv.service';



@Component({
  selector: 'app-home',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  showFiller = false;

  events: string[] = [];
  opened: boolean;
  
  user : User;
  dialogRef;
  role:string='';
  colums:string[] =['id','firstName',  'lastName', 'latestCVupdate', 'cvupdatedBy', 'deleteUser','showCV'];
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  userTemperoryStorage:User[]
  index:number = 0;
 

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog, 
              public userService:UserService,
              private messageService:MessageService,
              private cvpdfService:CvpdfService,
              public usercvService:UsercvService
              ) { }
  dataSource = new MatTableDataSource<User>(this.userService.users);
  ngOnInit() {
    this.getCurrentUser();
    this.getAllUser();
    this.role = localStorage.getItem('role'); 
    this. setDisplayedColumns();  
  }
 
  setDisplayedColumns(){     
      if(this.userService.isAdmin()){
        this.displayedColumns = this.colums
      }else{
        this.displayedColumns = this.colums.filter(obj => obj !== 'deleteUser');       
      }
      this.columnsToDisplay = this.displayedColumns.slice();
  }

  getCurrentUser(){
  let currentUseruser =  localStorage.getItem("currentUser");
  let token =  localStorage.getItem("token");
  }

  createDialog() {
    this.dialogRef = this.dialog.open(AdduserComponent);
  }

  refreshUsers(){
    this.dialogRef.afterClosed().subscribe(
    );
  }

  
  applyFilter(filterValue:string, keyCode:number){
    if(keyCode == 8 ){
     this.userService.users = this.userTemperoryStorage.filter(usr => usr.firstName.toLocaleLowerCase().startsWith(filterValue.toLocaleLowerCase()))
    }else if (filterValue != null && filterValue != "" && keyCode != 8) {    
      if(this.index == 0){
        this.userTemperoryStorage = this.userService.users;      
      }
      this.index = 1
      this.userService.users = this.userService.users.filter(usr => usr.firstName.toLocaleLowerCase().startsWith(filterValue.toLocaleLowerCase()));
    } else {
      this.getAllUser();
    }
  }


  getAllUser(){
    this.userService.getAllUser().subscribe(responseData => this.userService.users = responseData,
                                            error => this.messageService.showMessage(this.messageService.messages.get('getAllUserError'),
                                                                                     error.message,
                                                                                     'error',
                                                                                     'ok',
                                                                                     false
                                                                                    )                                    
                                           )
  }

  
   deleteUser(row){ 
     this.messageService.showMessage(this.messageService.messages.get('deleteUserConfirmation'),
                                     this.messageService.messages.get('revertActieon'),
                                     'warning',
                                     'deleteText'
                                     , true
                                    ).then(async (result) => {
                                                                if (result.value) {
                                                                    this.userService.deleteUser( row);
                                                                } 
                                                              }
                                          )
    
  }

 showCV(row){
  this.cvpdfService.downloadSelectedUserCV(row["id"])
 }

 showCVOfSelectedUser(row){
  this.userService.nameOfSelectedUser = this.createUserName(row['firstName'], row['insertion'], row['lastName'])
  this.usercvService.selectedUserId  = row['id']
  this.usercvService.getUserCV(this.usercvService.selectedUserId, this.usercvService.selectedLanguage)
 }

 createUserName(firstName:string, insertion:string, lastName:string):string{
  if(insertion != null){
    return firstName+' '+insertion+' '+lastName
  }else{
    return  firstName+' '+lastName
  }

 }
  
}
