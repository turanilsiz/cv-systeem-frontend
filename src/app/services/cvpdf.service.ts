import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'
import { Personel } from '../models/personel';
import * as _moment from 'moment';
import { Education } from '../models/education';
import { Training } from '../models/training';
import { Certificate } from '../models/certificate';
import { Language } from '../models/language';
import { Work } from '../models/work';
import { DatePipe } from '@angular/common';
import { Project } from '../models/project';
import { MessageService } from './message.service';
import { UserCV } from '../models/user-cv';
import { UsercvService } from './usercv.service';
import { CvwordService } from './cvword.service';
import { Characteristic } from '../models/characteristic';
import { ResourceService } from './resource.service';
import { Expertise } from '../models/expertise';







export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Injectable({
  providedIn: 'root'
})
export class CvpdfService {
  userCv:UserCV;
 // cvTemplate:any = cvtemplate;
 // cvTemplateDefault = this.cvTemplate['default'];
  

  pageNumber           :number = 1 ;
  fontSize             :number = 10;
  titleFontSize        :number = 12;
  text_X               :number = 25;
  drawRedLine_x1       :number = 20;
  drawRedLine_x2       :number = 530;
  distanceBetweenLines :number = 14;
  margeForNewPage      :number = 780;
  paddingTopForNewPage :number = 75;
  y_forNewPage         :number = 90
  isNewPageAdded       :boolean =false
  y_forNewPageForRedSquare : number = this.y_forNewPage -30
  margeForNewPageBeforeDrawRedSquare : number = this.margeForNewPage - 80
  printText_x:number = 100
  printText_lengthOfText = 100
  printText_max_x_position = 420


  constructor(private datePipe        : DatePipe,
              private messageService  : MessageService,
              private usercvService   : UsercvService,
              private cvwordService   : CvwordService,
              private resourceService : ResourceService,
             ) { }

  //ADRES VAN HET DPA Geos
  addAdress(doc:jsPDF):number{
    let y:number=45
    doc.setFontSize(this.fontSize)
    doc.setTextColor(255, 0, 0) 
    doc.text('DPA GEOS',this.drawRedLine_x1, y )
    doc.text('Wiersedreef 5 ',this.drawRedLine_x1, y=y+this.distanceBetweenLines)
    doc.text('3433 ZX Nieuwegein ',this.drawRedLine_x1, y=y+this.distanceBetweenLines)
    return y;
  }
  
  //title met rode vierkant
  drawRedLine(doc:jsPDF,  y:number,  text:string):number{
    doc.setDrawColor(255, 0, 0)
    doc.setLineWidth(25)
    doc.line(this.drawRedLine_x1, y+40, this.drawRedLine_x2, y+40)
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(this.titleFontSize)
    doc.text(text, this.drawRedLine_x1+10, y+45)   
    return y+45;
  }
  
  //vul personlinjke informatiw in het cv
  fillPersonelInformation(doc:jsPDF, personel:Personel):number{
    let y:number = 150;
    let colon_x:number = 120;
    let text2_x:number = 140;
    doc.setFontSize(this.fontSize)
    doc.setTextColor(0, 0, 0)
    let colon :string = this.resourceService.cvresources.get('colon')
    y = this.writePersonelInformation(doc, this.resourceService.cvresources.get('name')             , colon, personel.userName, this.text_X, colon_x ,text2_x, y)
    y = this.writePersonelInformation(doc, this.resourceService.cvresources.get('birthdate')        , colon, _moment(personel.birthDate).format('DD-MM-YYYY'), this.text_X, colon_x ,text2_x, y)
    y = this.writePersonelInformation(doc, this.resourceService.cvresources.get('residence')        , colon, personel.residence, this.text_X, colon_x ,text2_x, y)
    y = this.writePersonelInformation(doc, this.resourceService.cvresources.get('nationality')      , colon, personel.nationality                            , this.text_X, colon_x ,text2_x, y)
    y = this.writePersonelInformation(doc, this.resourceService.cvresources.get('hoursAvailabel')   , colon, ""+personel.hoursAvailabel                      , this.text_X, colon_x ,text2_x, y)
    y = this.writePersonelInformation(doc, this.resourceService.cvresources.get('currentFunction')  , colon, personel.currentFunction                        , this.text_X, colon_x ,text2_x, y)
    y = this.writePersonelInformation(doc, this.resourceService.cvresources.get('itExperienceSince'), colon, ""+personel.itExperienceSince                   , this.text_X, colon_x ,text2_x, y)

    
   return y;
  }
   
  writePersonelInformation(doc:jsPDF, text1:string, colon:string, text2:string, x:number, colon_x:number, text2_x:number, y:number):number{
    let distance:number = 12
    doc.text(text1, this.text_X, y)
    doc.text(colon, colon_x, y)
    doc.text(text2.trim(), text2_x, y)
    y = y+distance;
   return y;
  }



  //vul samenvatting van gebruiker in het cv
  fillGlobelProfile(doc:jsPDF, globelProfil:string, characteristics:Characteristic[],  y:number): number{
    var splitTitle = doc.splitTextToSize(globelProfil, 600);
    y=y+20
    for (var i = 0; i < splitTitle.length; i++) {
      let v :string= splitTitle[i]
      v = v.replace(/’/g, "\'")
      doc.setFontSize(this.fontSize)
      doc.setTextColor(0, 0, 0)
      doc.text(this.text_X, y, v);
      y=y+this.distanceBetweenLines;
    }
    
    //Hier worden personelijke kenmerken ingevuld
    y = y+20
    doc.text(this.text_X, y, this.resourceService.cvresources.get('personel-charc'))
    y = y+17

    for(var i=0; i<characteristics.length; i++){
      if(!characteristics[i].disabled){
        let x_characters:number = 43
        doc.circle(35, y-3, 2, 'F');
        if(characteristics[i].characteristic.length > 110){
           var splitText = doc.splitTextToSize(characteristics[i].characteristic, 480)
           for(var j=0; j < splitText.length; j++ ){
              doc.text(x_characters, y, ""+splitText[j] )
              y=y+this.distanceBetweenLines;
           }
        }else{
          doc.text(x_characters, y, characteristics[i].characteristic)
          y=y+this.distanceBetweenLines;
        }
      }     
    }
    this.addFooter(doc, this.pageNumber)
    //pagine 1 klaar, hierna wordt er pagina 2 beingt.
    return this.y_forNewPage;
  }


  //vul opleidingen in het cv
  fillEducation(doc:jsPDF, y:number ,educations:Education[] ):number{
    doc.setFontSize(this.fontSize)
    doc.setTextColor(0, 0, 0)
    doc.text(this.resourceService.cvresources.get('prev-education'), this.text_X, y+20)
    for(var i=0; i < educations.length; i++){
      if(!educations[i].disabled){
        if(i ==0){
          y =y+40
        }else{
          y =y+this.distanceBetweenLines
        }
        
        if(y>this.margeForNewPage){
          y = this.addNewPage(doc)
        }
        let startDate = new Date(educations[i].startDate).getFullYear()
        let endDate = new Date(educations[i].endDate).getFullYear()
        let text = startDate +'-'+ endDate;
        doc.text(text, this.text_X, y)
  
        let text2 = educations[i].result.trim()+', '+educations[i].education
        //doc.text(text2, 100, y)
        y = this.printText(doc,text2, y)
      }
      
    }
    return y;
  }

 

  //vul Trainingen in het cv
  fillTraining(doc:jsPDF, y:number, training:Training[]):number{
    doc.setFontSize(this.fontSize)
    doc.setTextColor(0, 0, 0)
    doc.text(this.resourceService.cvresources.get('educ-tr-curs'), this.text_X, y+30)
    for(var i=0; i< training.length; i++){
      if(!training[i].disabled){
        if(i == 0){
          y = y+50
        }else{
          y = y+this.distanceBetweenLines
        }
       
        if (y > this.margeForNewPage){
          y = this.addNewPage(doc)
        }
        let year =new Date(training[i].year).getFullYear();
        
        doc.text(""+training[i].year, this.text_X, y)
  
        let text:string = training[i].training.trim()+', '+training[i].institute
        //doc.text(text, 100, y)
        y = this.printText(doc, text, y)

      }     
    }
    return y;
  }
  
  //vul certificaten in het cv
  fillCertificates(doc:jsPDF, y:number, certificates:Certificate[], index:number):number{
    doc.setFontSize(this.fontSize)
    doc.setTextColor(0, 0, 0)
    for(var i= index; i< certificates.length; i++){
      if(!certificates[i].disabled){
        if(i == 0){
          y =y+20
        }else{
          y =y+this.distanceBetweenLines
        }
        if (y > this.margeForNewPage){    
          y = this.addNewPage(doc) 
          y =  this.fillCertificates(doc, y/*this.paddingTopForNewPage*/, certificates, i )
          break;  
        }
        doc.text(""+certificates[i].year, this.text_X, y)
        let text2 = certificates[i].certificate.trim()+'; '+certificates[i].institute
        //doc.text(text2, 100, y)
        y = this.printText(doc, text2, y)
      }
      
    }
    return y;
  }

  //vul taal in het cv
  fillLanguage(doc:jsPDF, y:number, lanuages:Language[], index:number):number{
    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    doc.setFontType('bold')

    let distance_x:number =140
    y = y+30
    doc.text(this.resourceService.cvresources.get('userLanguage'), this.text_X, y)
    let x_speak = this.text_X + distance_x
    doc.text(this.resourceService.cvresources.get('speak'), x_speak, y)

    let x_write = x_speak + distance_x
    doc.text(this.resourceService.cvresources.get('write'), x_write, y)

    let x_read = x_write + distance_x
    doc.text(this.resourceService.cvresources.get('read'),  x_read, y)

    for(var i=index; i < lanuages.length; i++){
      if(!lanuages[i].disabled){
        doc.setFontSize(this.fontSize)
        doc.setTextColor(0, 0, 0)
        doc.setFontType('normal')
        if(y > this.margeForNewPage){
         y =  this.addNewPage(doc)
        }
        y = y+20
        doc.text(lanuages[i].userLanguage.trim(), this.text_X, y)
        doc.text(lanuages[i].speak, x_speak , y)
        doc.text(lanuages[i].write, x_write, y)
        doc.text(lanuages[i].read, x_read, y)
      }      
    }
    
    return y
  } 
  
    //vul werkervaring in het cv
  fillWorkExperince(doc:jsPDF, y:number, works:Work[], index:number):number{
    doc.setFontSize(this.fontSize)
    doc.setTextColor(0, 0, 0)
    for(var i = index; i < works.length; i++){
      if(!works[i].disabled){
        if(i ==0){
          y =y+20
        }else{
          y =y+this.distanceBetweenLines
        }
        let startDate = new Date(works[i].startDate).getFullYear()
        let endDate
        if(works[i].endDate == null){
          endDate = this.resourceService.cvresources.get('present')
        }else{
          endDate = new Date(works[i].endDate).getFullYear()
        }
        if(y > this.margeForNewPage){
          y = this.addNewPage(doc)
        }
        let text = startDate +'-'+ endDate;
        doc.text(text, this.text_X, y)
  
        let text2 = works[i].function.trim()+', '+works[i].company
        //doc.text(text2, 100, y)
        y = this.printText(doc, text2, y)
      }      
    } 
    return y;
  }
  
  //vul projectervaring in het cv
  fillProjectExperince(doc:jsPDF, y:number, projects:Project[], index:number):number{
    let colon_x:number = 100;
    let text_x :number = 120;
    doc.setFontSize(this.fontSize)
    doc.setTextColor(0, 0, 0)
    for(var i = index; i < projects.length; i++){
      if(!projects[i].disabled){
        if(y > this.margeForNewPage){
          this.addNewPage(doc)
          y =  this.fillProjectExperince(doc, this.paddingTopForNewPage, projects, i )
          break;
        }
        y=y+30
     
        let startDate = this.datePipe.transform(projects[i].startDate, 'dd-MM-yyyy')
        let endDate   = this.datePipe.transform(projects[i].endDate, 'dd-MM-yyyy')
        let period = startDate +'  /  '+ endDate;
        let colon = this.resourceService.cvresources.get('colon')
        if(y>this.margeForNewPage){
          y = this.addNewPage(doc) 
        }
        y = this.writeTextForProjectExperince(doc, this.resourceService.cvresources.get('period')     , colon, period                 , this.text_X, colon_x, text_x, y)  
        if(y>this.margeForNewPage){
          y = this.addNewPage(doc) 
        }    
        y = this.writeTextForProjectExperince(doc, this.resourceService.cvresources.get('projectName'), colon, projects[i].projectName, this.text_X, colon_x, text_x, y)
        if(y>this.margeForNewPage){
          y = this.addNewPage(doc) 
        }   
        y = this.writeTextForProjectExperince(doc, this.resourceService.cvresources.get('client')     , colon, projects[i].client     , this.text_X, colon_x, text_x, y)
        if(y>this.margeForNewPage){
          y = this.addNewPage(doc) 
        }  
        y = this.writeTextForProjectExperince(doc, this.resourceService.cvresources.get('role')       , colon, projects[i].role       , this.text_X, colon_x, text_x, y)
        if(y>this.margeForNewPage){
          y = this.addNewPage(doc) 
        }  
        y = this.writeTextForProjectExperince(doc, this.resourceService.cvresources.get('activity')   , colon, projects[i].activity   , this.text_X, colon_x, text_x, y)
        if(y>this.margeForNewPage){
          y = this.addNewPage(doc) 
        }  
        y = this.writeTextForProjectExperince(doc, this.resourceService.cvresources.get('tools')      , colon, projects[i].tools      , this.text_X, colon_x, text_x, y)

      }     
    }
    return y;
  }

  writeTextForProjectExperince(doc:jsPDF, text1:string, colon:string, text2:string, x:number, colon_x:number, text2_x:number, y:number):number{
    doc.text(text1, x, y)
    doc.text(colon, colon_x, y)
  /*
    if(text2.length > 90){
      var splitActivity = doc.splitTextToSize(text2, 420);
      for(var j=0; j<splitActivity.length; j++){
        doc.text(splitActivity[j].trim(), text2_x, y)
        y = y+this.distanceBetweenLines
      }

    }else{
      doc.text(text2.trim(), text2_x, y )
      y = y+this.distanceBetweenLines
    }*/
    y = this.printText(doc, text2, y)
    return y;
  }
  
  //footer text
  addFooter(doc:jsPDF, pageNumber){
    doc.setFontSize(7)
    doc.setTextColor(0, 0, 0)
    doc.text(this.resourceService.cvresources.get('footerText1'), 10, 800)
   
    doc.setFontSize(7)
    doc.setTextColor(0, 0, 0)
    doc.text(this.resourceService.cvresources.get('footerText2'), 10, 810)
  
    
    doc.setFontSize(this.fontSize)
    doc.setTextColor(0, 0, 0)
    doc.text(this.resourceService.cvresources.get('page') + pageNumber,500,815); //print number bottom right
    this.pageNumber++

  }
  
  addNewPage(doc:jsPDF):number{
    doc.addPage()
    this.addFooter(doc, this.pageNumber);
    doc.addImage('assets/images/dpalogo2.png', 'png',450, 20, 80, 60)
    this.isNewPageAdded = true
    return this.y_forNewPage
  }
  

  async downloadSelectedUserCV(selectedUserId:number){    
    this.userCv = await this.usercvService.getUserCvAsync(selectedUserId)
    if(this.userCv['personel'] != null){
      this.messageService.showMessageForSelectedUserCV()
                          .then(result=> {
                                            if(result.value == 'pdf'){
                                              this.downloadUserCVPDF(this.userCv['personel'], this.userCv['characteristic'], this.userCv['expertises'], this.userCv['educations'], this.userCv['trainings'], this.userCv['certificates']
                                                                   , this.userCv['languages'],  this.userCv['works'], this.userCv['projects'])
                                            }else if(result.value == 'word'){
                                              this.cvwordService.downloadUserCVWord(this.userCv['personel'],this.userCv['characteristic'], this.userCv['expertises'], this.userCv['educations'], this.userCv['trainings'], this.userCv['certificates']
                                                                    , this.userCv['languages'], this.userCv['works'], this.userCv['projects'])
                                            }
                                         }
                               );  

    }else{
      this.messageService.showMessage(null, this.messageService.messages.get('emptyCV'), 'error', 'ok', false)
    }
                                  
  }
   
  fillExpertise(doc:jsPDF, y:number, expertises:Expertise[]):number{
    y = this.fillExpertiseLevel(doc, y)
    y = this.fillExpertForEachType(doc, y, expertises, this.resourceService.cvresources.get('expertField'))
    y = this.fillExpertForEachType(doc, y, expertises, this.resourceService.cvresources.get('progLanguage'))
    y = this.fillExpertForEachType(doc, y, expertises, this.resourceService.cvresources.get('databases'))
    y = this.fillExpertForEachType(doc, y, expertises, this.resourceService.cvresources.get('tools'))
    y = this.fillExpertForEachType(doc, y, expertises, this.resourceService.cvresources.get('methodes'))
    y = this.fillExpertForEachType(doc, y, expertises, this.resourceService.cvresources.get('frameworks'))
    y = this.fillExpertForEachType(doc, y, expertises, this.resourceService.cvresources.get('testing'))
    y = this.fillExpertForEachType(doc, y, expertises, this.resourceService.cvresources.get('servers'))
    y = this.fillExpertForEachType(doc, y, expertises, this.resourceService.cvresources.get('ide'))

    return y
  }

  fillExpertiseLevel(doc:jsPDF, y:number):number{
      y = y + 20
      var plus= '+'
      doc.setFontSize(this.fontSize)
      doc.setTextColor(0, 0, 0)
      let expertiseLevels = this.resourceService.expertiseLevels
      let index:number = expertiseLevels.size
      let teller:number = 3
      
      expertiseLevels.forEach((value: string, key: string) => {
        doc.text(this.text_X, y, plus)
       /* let x:number =25
        for(var i = teller; i<index; i++){
          doc.circle(x, y-3, 2, 'F');
          x = x+5
        }
        */
       
        doc.text(this.text_X+40, y, value)
        plus=plus+'+'
        y = y+ this.distanceBetweenLines
        //teller = teller - 1
       });
      //doc.text(this.text_X, y, this.resourceService.cvresources.get('exspertiseLevel_1'))
       y = y + 20
       let x_lev_title = this.text_X
       doc.setFontStyle('bold')
       doc.text(x_lev_title, y, this.resourceService.cvresources.get('description')) 
       x_lev_title = x_lev_title + 330
       doc.text(x_lev_title, y, this.resourceService.cvresources.get('expertiseLevel'))
       x_lev_title = x_lev_title + 70
       doc.text(x_lev_title, y, this.resourceService.cvresources.get('lastYearOfExperience'))
       doc.setFontStyle('normal')
       return y
  }

  fillExpertForEachType(doc:jsPDF, y:number, expertises:Expertise[], expertiseType:string):number{
    let isExpertiseTypePrinted : boolean = false
    
    expertises.forEach(exp =>{
      if(exp.expertiseType == expertiseType && !exp.disabled) {
          y = y + this.distanceBetweenLines
          if(!isExpertiseTypePrinted){
             if(y > this.margeForNewPage - 20){
              y = this.addNewPage(doc)
             }
             doc.setTextColor(255, 0, 0)
             doc.setFontStyle('bold')
             doc.text(this.text_X, y, expertiseType)
             isExpertiseTypePrinted = true
             y = y + this.distanceBetweenLines
          }
          if(y > this.margeForNewPage){
            y = this.addNewPage(doc)
          }
          y = this.printDescriptionLevelExperienceYear(doc, y, exp)
          
      } 
    });
    return y
  }

  printDescriptionLevelExperienceYear(doc:jsPDF, y:number, exp:Expertise):number{
      doc.setTextColor(0, 0, 0)
      doc.setFontStyle('normal')
      doc.text(this.text_X, y, '-  '+exp.description)
      switch(exp.expertiseLevel){
          case this.resourceService.expertiseLevels.get('exspertiseLevel_1') :
            doc.text(this.text_X+330, y, '+')
            break;

          case this.resourceService.expertiseLevels.get('exspertiseLevel_2') :
            doc.text(this.text_X+330, y, '++')
            break;
            
          case this.resourceService.expertiseLevels.get('exspertiseLevel_3') :
            doc.text(this.text_X+330, y, '+++')
            break;  

          case this.resourceService.expertiseLevels.get('exspertiseLevel_4') :
            doc.text(this.text_X+330, y, '++++')
            break;  
      }
      
      doc.text(this.text_X+430, y, ''+exp.lastYearOfExperience)
    return y 
  }

 
 
  //DOWNLOAD CV IN PDF FORMAT
  downloadUserCVPDF(personel:Personel, characteristics:Characteristic[], expertises:Expertise[], educations:Education[], trainings:Training[], certificates:Certificate[]
             , languages:Language[] , works:Work[], projects:Project[], ) {
      
      var doc = new jsPDF('p', 'pt', 'a4')
      let highestValue_y: number;
      //adress
      
      highestValue_y = this.addAdress(doc)
      //logo van DPA
      doc.addImage('assets/images/dpalogo2.png', 'png', 450, 30, 80, 60)
      highestValue_y = this.drawRedLine(doc, highestValue_y, this.resourceService.cvresources.get('personelInfoTitle'))

      //add user photo into CV
      if(this.usercvService.showUserPhotoInCV && this.usercvService.photoOfSelectedUser != null){
        doc.addImage(this.usercvService.photoOfSelectedUser, 'png',450, highestValue_y+20, 80,60) 
      }
      
      //Print personel information of user into  CV
      highestValue_y = this.fillPersonelInformation(doc, personel)
      highestValue_y = this.drawRedLine(doc, highestValue_y, this.resourceService.cvresources.get('globelProfTitle'))
      highestValue_y = this.fillGlobelProfile(doc, personel.globelProfile, characteristics,  highestValue_y)
      
      //pagina 2 start vanaf hier, print expertise of user into CV
      highestValue_y = this.addNewPage(doc)
      highestValue_y = this.drawRedLine(doc, this.y_forNewPageForRedSquare, this.resourceService.cvresources.get('expertiseHeader'))
      highestValue_y = this.fillExpertise(doc, highestValue_y, expertises)
      
      this.isNewPageAdded = false
      if(highestValue_y > this.margeForNewPageBeforeDrawRedSquare){
        highestValue_y = this.addNewPage(doc)
      }
      highestValue_y = this.drawRedLine(doc, this.isNewPageAdded ? this.y_forNewPageForRedSquare: highestValue_y, this.resourceService.cvresources.get('educationAndTrainig'))
      this.isNewPageAdded = false
      //print educations(s) od user into CV
      highestValue_y = this.fillEducation(doc, highestValue_y, educations)
      if (trainings.length > 0) {
        highestValue_y = this.fillTraining(doc, highestValue_y, trainings)
      }
      this.isNewPageAdded = false
      if (certificates.length > 0) {
        if(highestValue_y > this.margeForNewPageBeforeDrawRedSquare){
          highestValue_y = this.addNewPage(doc)
        }
        highestValue_y = this.drawRedLine(doc, this.isNewPageAdded? this.y_forNewPageForRedSquare : highestValue_y, this.resourceService.cvresources.get('certificatesTitle'))
        highestValue_y = this.fillCertificates(doc, highestValue_y, certificates, 0)
      }
      this.isNewPageAdded = false
      if(highestValue_y > this.margeForNewPageBeforeDrawRedSquare){
        highestValue_y = this.addNewPage(doc)
      }
      highestValue_y = this.drawRedLine(doc, this.isNewPageAdded ? this.y_forNewPageForRedSquare : highestValue_y, this.resourceService.cvresources.get('languageTitle'))
      highestValue_y = this.fillLanguage(doc, highestValue_y, languages, 0)
      this.isNewPageAdded = false
      if(highestValue_y > this.margeForNewPageBeforeDrawRedSquare){
        highestValue_y = this.addNewPage(doc)
      }
      highestValue_y = this.drawRedLine(doc, highestValue_y, this.resourceService.cvresources.get('workExperinceTitle'))
      highestValue_y = this.fillWorkExperince(doc, highestValue_y, works, 0)
      this.isNewPageAdded = false
      if (projects.length > 0) {
        if(highestValue_y > this.margeForNewPageBeforeDrawRedSquare){
          highestValue_y = this.addNewPage(doc)
        }
        highestValue_y = this.drawRedLine(doc, this.isNewPageAdded ? this.y_forNewPageForRedSquare : highestValue_y, this.resourceService.cvresources.get('projectExperince'))
        highestValue_y = this.fillProjectExperince(doc, highestValue_y, projects, 0)
      }
      //Footer text
      //this.addFooter(doc, this.pageNumber, this.cvTemplateDefault);
      this.pageNumber = 1
      doc.save(personel.userName + ' CV.pdf');
      
  }
  
  printText(doc:jsPDF, text:string,  y:number):number{
    let x:number = 100
    let lengthOfText : number = 100
    let max_x_position : number = 420

    if(text.length > lengthOfText){
      var splitActivity = doc.splitTextToSize(text, max_x_position);
      for(var j=0; j<splitActivity.length; j++){
        doc.text(splitActivity[j].trim(), x, y)
        y = y+this.distanceBetweenLines
      }

    }else{
      doc.text(text.trim(), x, y )
      y = y+this.distanceBetweenLines
    }
   return y
  }
}
