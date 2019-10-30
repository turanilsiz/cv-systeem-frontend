import { Data } from '@angular/router';

export class User {
    id              :number;
    userName        :string;
    password        :string;
    acedemicTitle   :string;
    initial         :string;
    firstName       :string;
    insertion       :string;
    lastName        :string;
    startDate       :Date;
    lastTimeInlog   :Date;
    createdBy       :String;
    creationDateTime:Date;
    photo           :string;
    role            :string;
    active          :number; 
    latestCVupdate  :Date; 
    cvupdatedBy     :string 

    constructor(id              :number
              , userName        :string
            ,   password        :string
            ,   acedemicTitle   :string
            ,   initial         :string
            ,   firstName       :string
            ,   insertion       :string 
            ,   lastName        :string         
            ,   startDate       :Date                           
            ,   createdBy       :string
            ,   role            :string
            ,   active          :number
            ,   latestCVupdate  :Date
            ,   cvupdatedBy     :string
       ){
            this.id             = id;          
            this.userName       = userName;
            this.password       = password;
            this.acedemicTitle  = acedemicTitle;
            this.initial        = initial;
            this.firstName      = firstName;
            this.insertion      = insertion;
            this.lastName       = lastName;            
            this.startDate      = startDate;
            this.createdBy      = createdBy;
            this.role           = role; 
            this.active         = active;   
            this.latestCVupdate = latestCVupdate    
            this.cvupdatedBy    = cvupdatedBy
        }
}
