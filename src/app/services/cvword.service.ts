import { Injectable } from '@angular/core';
import { Document, Packer, Paragraph, TextRun, Media, HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom, PictureRun, Table, WidthType, TableRow, Footer, HeadingLevel, Header, AlignmentType, TableLayoutType, BorderStyle, TableCell, ShadingType } from "docx";
import { saveAs } from 'file-saver';
import { Education } from '../models/education';
import { Training } from '../models/training';
import { Certificate } from '../models/certificate';
import { Language } from '../models/language';
import { Work } from '../models/work';
import { Personel } from '../models/personel';
import { Project } from '../models/project';
import { Characteristic } from '../models/characteristic';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as _moment from 'moment';
import { UsercvService } from './usercv.service';
import { MessageService } from './message.service';
import { UserCV } from '../models/user-cv';
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
export class CvwordService {
  
  leftMagerForTable:number = 150
  logo:string="";
  usercv:UserCV
  tableCellMarginTop:number = 50

  

  constructor(private http:HttpClient,
              private usercvservice: UsercvService,
              private messageService : MessageService,
              private resourceService:ResourceService,             
              ) { 

                this.getDpaLogo()
              }



  downloadUserCVWord(personel:Personel, characteristics : Characteristic[], expertises:Expertise[], educations:Education[], trainings:Training[], certificates:Certificate[]
    , languages:Language[] , works:Work[], projects:Project[], ){
      const doc = new Document(); 
      const  footerText = new TextRun({
          text:this.resourceService.cvresources.get('footerText1')+" "+this.resourceService.cvresources.get('footerText2'),
          size: 15
        })                                      
                                               
      this.addFirstPage(doc, personel, characteristics,footerText)
      this.addSecondPage(doc, expertises, educations, trainings, certificates, languages, works, projects, footerText ) 
      Packer.toBlob(doc).then(blob => {
        saveAs(blob, personel.userName +" CV.docx");   
      });
 
    }
    
    addSecondPage(doc:Document,  expertises:Expertise[],  educations:Education[], trainings:Training[], certificates:Certificate[], languages:Language[], works:Work[], projects:Project[],  footerText){
      
      let expertField  : Expertise[]=[]
      let progLanguage : Expertise[]=[]
      let databases    : Expertise[]=[]
      let tools        : Expertise[]=[]
      let methodes     : Expertise[]=[]
      let frameworks   : Expertise[]=[]
      let testing      : Expertise[]=[]
      let servers      : Expertise[]=[]
      let ide          : Expertise[]=[]
      this.sortExpertiseForEachType(expertises, expertField, progLanguage, databases, tools, methodes, frameworks, testing, servers, ide)
      doc.addSection({
        headers: {
          default: new Header({ children: [new Paragraph(this.addDPALogo(doc))]}),
        },
        footers: {
          default: new Footer({children : [new Paragraph({children:[footerText]})] }),
        },
        children:[ this.addSpaceBetweenTitleAndConten(400)
                ,  this.setTitle('  '+this.resourceService.cvresources.get('expertiseHeader')) 
                ,  this.addSpaceBetweenTitleAndConten(40)
                ,  this.fillExpertiseLevel()
                ,  this.addSpaceBetweenTitleAndConten(100)
                ,  this.fillExpertForEachType(expertField , this.resourceService.cvresources.get('expertField'))
                ,  this.fillExpertForEachType(progLanguage, this.resourceService.cvresources.get('progLanguage'))
                ,  this.fillExpertForEachType(databases   , this.resourceService.cvresources.get('databases'))
                ,  this.fillExpertForEachType(tools       , this.resourceService.cvresources.get('tools'))
                ,  this.fillExpertForEachType(methodes    , this.resourceService.cvresources.get('methodes'))
                ,  this.fillExpertForEachType(frameworks  , this.resourceService.cvresources.get('frameworks'))
                ,  this.fillExpertForEachType(testing     , this.resourceService.cvresources.get('testing'))
                ,  this.fillExpertForEachType(servers     , this.resourceService.cvresources.get('servers'))
                ,  this.fillExpertForEachType(ide         , this.resourceService.cvresources.get('ide'))
                ,  this.addSpaceBetweenTitleAndConten(100)
                ,  this.setTitle('  '+this.resourceService.cvresources.get('educationAndTrainig')) 
                ,  new Paragraph({children:[new TextRun({text:'  '+this.resourceService.cvresources.get('prev-education'), bold:true})]})
                ,  this.fillEducations(educations)
                ,  this.addSpaceBetweenTitleAndConten(60)
                ,  new Paragraph({children:[new TextRun({text:'  '+this.resourceService.cvresources.get('educ-tr-curs'), bold:true})]})
                ,  this.fillTrainings(trainings)
                ,  this.addSpaceBetweenTitleAndConten(100)
                ,  this.setTitle('  '+this.resourceService.cvresources.get('certificatesTitle'))
                ,  this.addSpaceBetweenTitleAndConten(40)
                ,  this.fillCertificates(certificates)
                ,  this.addSpaceBetweenTitleAndConten(100)
                ,  this.setTitle('  '+this.resourceService.cvresources.get('languageTitle'))
                ,  this.addSpaceBetweenTitleAndConten(40)
                ,  this.fillLanguages(languages)
                ,  this.addSpaceBetweenTitleAndConten(100)
                ,  this.setTitle('  '+this.resourceService.cvresources.get('workExperinceTitle'))
                ,  this.addSpaceBetweenTitleAndConten(100)
                ,  this.fillWorkExperinces(works)
                ,  this.addSpaceBetweenTitleAndConten(100)
                ,  this.setTitle('  '+this.resourceService.cvresources.get('projectExperince'))
                ,  this.addSpaceBetweenTitleAndConten(100)
                ,  this.fillProjectsExperinece(projects)
               ], 
      })
    }
    

    fillProjectsExperinece(projects:Project[]):Table{
      
      let rowNumber:number = 0
      projects.forEach(pro =>{
        if(!pro.disabled){
          rowNumber = rowNumber+1
        } 
      })
      rowNumber = rowNumber*5
      const table = new Table({
        rows         : rowNumber,
        columns      : 3, 
        width        : 100,
        widthUnitType: WidthType.PERCENTAGE,
      })
      this.processTableCell(table, rowNumber, 3)
      let cellIndex = 0
      for(var i=0; i< projects.length; i++){
        if(!projects[i].disabled){
          for(var j= 0; j < 5; j++){
            if(cellIndex != 0 && cellIndex%5 == 0){
              let margin:number= 800
              table.getCell(cellIndex,0).setMargins({top:margin})
              table.getCell(cellIndex,1).setMargins({top:margin})
              table.getCell(cellIndex,2).setMargins({top:margin})
            } 
            table.getCell(cellIndex,0).add(this.fillTitleAndValueProjectExperience(j, projects[i], true))
            table.getCell(cellIndex,1).add(new Paragraph({children:[new TextRun({text:'   :', bold:true, color: 'red'})]}))
            table.getCell(cellIndex,1).Properties.setWidth(500, WidthType.DXA)
            table.getCell(cellIndex,2).add(this.fillTitleAndValueProjectExperience(j, projects[i], false))
            cellIndex = cellIndex+1
           }
        }   
      }
      return table
    }
    
    
    fillTitleAndValueProjectExperience(index:number, project:Project, isTitle:boolean):Paragraph{
      let textColor:string ='red'     
      let isBold:boolean = true
      let title
      let value
      switch(index){
        case 0:
          let endDate
          if(isTitle){
            title = this.getTitleValueForProjectExperince(this.resourceService.cvresources.get('period')        , textColor, isBold)
          }else{
            if(project.endDate != null){
              endDate = _moment(new Date(project.endDate)).format('MMM-YYYY')
            }else{
              endDate = this.resourceService.cvresources.get('present')
            }
            let projectPeriod = _moment(new Date(project.startDate)).format('MMM-YYYY') +' / '+ endDate 
            value = this.getTitleValueForProjectExperince( projectPeriod, textColor, isBold) 
          }  
          break;

        case 1:
          if(isTitle){
            title = this.getTitleValueForProjectExperince(this.resourceService.cvresources.get('industry')      , textColor, isBold)
          }else{
            value = this.getTitleValueForProjectExperince(project.client, textColor, isBold) 
          }          
          break
          
        case 2:
          if(isTitle){
            title = this.getTitleValueForProjectExperince(this.resourceService.cvresources.get('function'), textColor, isBold)
          }else{
            value = this.getTitleValueForProjectExperince(project.role, textColor, isBold)
          }
          break
          
        case 3:
          if(isTitle){
            title = this.getTitleValueForProjectExperince(this.resourceService.cvresources.get('characteristic'), textColor, isBold)
          }else{
            value = this.getTitleValueForProjectExperince(project.tools, textColor, isBold) 
          } 
          break
          
        case 4:
          if(isTitle){
            title = this.getTitleValueForProjectExperince(this.resourceService.cvresources.get('activity'), textColor, isBold)
          }else{
            value = this.getTitleValueForProjectExperince( project.activity, null, false)
          }          
          break  
      }
      
      if(isTitle){
        return new Paragraph({
          children :[title]
        })
      }else{
        return new Paragraph({
          children :[value]
        })
      }
      
    }
    
    getTitleValueForProjectExperince(value:string, textColor:string, isBold:boolean):TextRun{
      if(isBold){
        return new TextRun({
          text : value,
          color: textColor,
          bold : true 
        })
      }else{
        return new TextRun({
          text : value,
          color: textColor, 
        })
      }
      
    }



    fillWorkExperinces(works:Work[]):Table{
      let rowNumber:number = 0
      works.forEach(work=>{
        if(!work.disabled){
          rowNumber = rowNumber + 1 
        }
      })
      rowNumber = rowNumber+1
      const table = new Table({
        rows         : rowNumber,
        columns      : 3, 
        width        : 100,
        widthUnitType: WidthType.PERCENTAGE,
      })

      this.processTableCell(table, rowNumber, 3)
      table.getCell(0,0).add(new Paragraph({children:[new TextRun({text: '  '+this.resourceService.cvresources.get('period'), bold:true, color:'red' })]}))   
      table.getCell(0,1).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('function'), bold:true, color:'red' })]}))   
      table.getCell(0,2).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('company'), bold:true, color:'red' })]}))   

      for(var i=0; i<works.length; i++){
        if(!works[i].disabled){
          let startDate = new Date(works[i].startDate).getFullYear()
          let endDate
          if(works[i].endDate != null){
            endDate = new Date(works[i].endDate).getFullYear()
          }else{
            endDate = this.resourceService.cvresources.get('present')
          }
  
          let text = startDate +'-'+ endDate;
          table.getCell(i,0).Properties.setWidth(1500, WidthType.DXA)
          table.getCell(i,0).add(new Paragraph('  '+text))
          table.getCell(i,1).add(new Paragraph(works[i].function))
          table.getCell(i,2).add(new Paragraph(works[i].company))
        }      
      }
      return table
    }

    fillLanguages(languages:Language[]):Table{
      let rowNumber:number = 0
      rowNumber = rowNumber + 1
      languages.forEach(lang =>{
        if(!lang.disabled){
          rowNumber = rowNumber + 1
        }
      })
      const table =new Table({
        rows         : rowNumber,
        columns      : 4, 
        width        : 100,
        widthUnitType: WidthType.PERCENTAGE,
      })

      this.processTableCell(table, rowNumber, 4)     
      table.getCell(0,0).add(new Paragraph({children:[new TextRun({text: '  '+this.resourceService.cvresources.get('userLanguage'), bold:true, color:'red' })]}))   
      table.getCell(0,1).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('speak'), bold:true, color:'red' })]}))   
      table.getCell(0,2).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('write'), bold:true, color:'red' })]}))   
      table.getCell(0,3).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('read'), bold:true, color:'red' })]}))

      for(var i=0; i < languages.length; i++){
        if(!languages[i].disabled){        
          table.getCell(i,0).add(new Paragraph('  '+languages[i].userLanguage))
          table.getCell(i,1).add(new Paragraph(languages[i].speak))
          table.getCell(i,2).add(new Paragraph(languages[i].write))
          table.getCell(i,3).add(new Paragraph(languages[i].read))
          
        }
        
      }
      return table
    }
    
    processTableCell(table:Table, rowNumber:number, cellNumber:number){
      
        for(var i=0; i<rowNumber; i++){
          for(var j=0; j<cellNumber; j++){
            table.getCell(i,j).Properties.addMargins({top:this.tableCellMarginTop})
            this.removeTableBorder(table.getCell(i,j))
          }
        }       
    }

    fillCertificates(certificates:Certificate[]):Table{
      let rowNumber:number = 0
      certificates.forEach(cert => {
        if(!cert.disabled){
          rowNumber = rowNumber + 1
        }
      })
      rowNumber = rowNumber + 1  
      const table = new Table({
        rows         : rowNumber,
        columns      : 3, 
        width        : 100,
        widthUnitType: WidthType.PERCENTAGE,
        
      })

      this.processTableCell(table, rowNumber, 3)
      table.getCell(0,0).add(new Paragraph({children:[new TextRun({text: '  '+this.resourceService.cvresources.get('year'), bold:true, color:'red' })]}))   
      table.getCell(0,1).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('institute'), bold:true, color:'red' })]}))   
      table.getCell(0,2).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('certificate'), bold:true, color:'red' })]})) 

      for(var i= 0; i < certificates.length; i++){
         if(!certificates[i].disabled){        
          table.getCell(i,0).Properties.setWidth(1500, WidthType.DXA)
          table.getCell(i,0).add(new Paragraph('  '+certificates[i].year)) 
          table.getCell(i,1).add(new Paragraph(certificates[i].institute))
          table.getCell(i,2).add(new Paragraph(certificates[i].certificate))
         }         
      }
      return table
    }


    fillTrainings(trainings:Training[]):Table{
      let rowNumber:number = 0
      trainings.forEach(training=>{
        if(!training.disabled){
          rowNumber = rowNumber +1
        }
      })
      rowNumber = rowNumber + 1
      const table = new Table({
        rows         : rowNumber,
        columns      : 3, 
        width        : 100,
        widthUnitType: WidthType.PERCENTAGE,
        
      })
      
      this.processTableCell(table, rowNumber, 3)
      table.getCell(0,0).add(new Paragraph({children:[new TextRun({text: '  '+this.resourceService.cvresources.get('year'), bold:true, color:'red' })]}))   
      table.getCell(0,1).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('institute'), bold:true, color:'red' })]}))   
      table.getCell(0,2).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('training'), bold:true, color:'red' })]})) 

      for(var i= 0; i < trainings.length; i++){
         if(!trainings[i].disabled){        
          table.getCell(i,0).Properties.setWidth(1500, WidthType.DXA)
          table.getCell(i,0).add(new Paragraph('  '+trainings[i].year))   
          table.getCell(i,1).add(new Paragraph(trainings[i].institute))       
          table.getCell(i,2).add(new Paragraph(trainings[i].training))
         }         
      }
      return table
    }

    
    fillEducations(educations:Education[]):Table{
      let rowNumber:number = 0
      educations.forEach(edu =>{
        if(!edu.disabled){
          rowNumber = rowNumber + 1
        }
      })
      rowNumber = rowNumber + 1
      const table = new Table({
        rows         : rowNumber,
        columns      : 3, 
        width        : 100,
        widthUnitType: WidthType.PERCENTAGE,
        
      })
      
      this.processTableCell(table, rowNumber,3)
      table.getCell(0,0).add(new Paragraph({children:[new TextRun({text: '  '+this.resourceService.cvresources.get('period'), bold:true, color:'red' })]}))   
      table.getCell(0,1).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('result'), bold:true, color:'red' })]}))   
      table.getCell(0,2).add(new Paragraph({children:[new TextRun({text: this.resourceService.cvresources.get('education'), bold:true, color:'red' })]})) 

      for(var i= 0; i < educations.length; i++){       
         if(!educations[i].disabled){
          let startDate = new Date(educations[i].startDate).getFullYear()
          let endDate = new Date(educations[i].endDate).getFullYear()
          let text = startDate +'-'+ endDate; 
          table.getCell(i,0).Properties.setWidth(1500, WidthType.DXA)
          table.getCell(i,0).add(new Paragraph('  '+text)) 
          table.getCell(i,1).add(new Paragraph(educations[i].result))
          table.getCell(i,2).add(new Paragraph(educations[i].education)) 
         }         
      }
      return table
    }

    fillExpertForEachType(expertises:Expertise[], expertiseType:string):Table{
      if(expertises.length > 0){
          let rowNumber:number = 0
          expertises.forEach(exp=>{
            if(!exp.disabled){
              rowNumber = rowNumber + 1
            }
          })
          rowNumber = rowNumber + 1
          let index    :number = 1
          let indxOfExp:number = 1
          let isExperField : boolean =false
          let descriptionTitle
          let levelTitle
          let lastExpYearTitle
          if(expertiseType === this.resourceService.cvresources.get('expertField')){
            rowNumber = rowNumber+1
            index     = index +1
            indxOfExp = indxOfExp+1
            isExperField = true

            descriptionTitle = new TextRun({
              text : this.resourceService.cvresources.get('description'),
              bold : true
            })

            levelTitle = new TextRun({
              text : this.resourceService.cvresources.get('expertiseLevel'),
              bold : true
            })

            lastExpYearTitle = new TextRun({
              text : this.resourceService.cvresources.get('lastYearOfExperience'),
              bold : true
            })
          }

          const table = new Table({
            rows         : rowNumber,
            columns      : 3, 
            width        : 110,
            widthUnitType: WidthType.PERCENTAGE,
          })
          const expertiseTypeTitle = new TextRun({
            text : expertiseType, 
            color:'red',
            bold : true
          })
          
          if(isExperField){
            this.removeTableBorder(table.getCell(0,0))
            table.getCell(0,0).add(new Paragraph({children:[descriptionTitle]}))
            this.removeTableBorder(table.getCell(0,1))
            table.getCell(0,1).add(new Paragraph({children:[levelTitle]}))
            this.removeTableBorder(table.getCell(0,2))
            table.getCell(0,2).add(new Paragraph({children:[lastExpYearTitle]}))
            
          }
         
          table.getCell(index-1,0).add(new Paragraph({children:[expertiseTypeTitle]}))
          this.removeTableBorder(table.getCell(index-1,0))
          this.removeTableBorder(table.getCell(index-1,1))
          this.removeTableBorder(table.getCell(index-1,2)) 
          for(var i=index; i < rowNumber; i++){
            if(!expertises[i-indxOfExp].disabled){
              this.removeTableBorder(table.getCell(i,0))
              this.removeTableBorder(table.getCell(i,1))
              this.removeTableBorder(table.getCell(i,2))
              table.getCell(i,2).setMargins({left:400})
  
              table.getCell(i,0).add(new Paragraph(' - '+expertises[i-indxOfExp].description))
              table.getCell(i,1).add(new Paragraph(this.getExpertiseLevelAsPlusSign(expertises[i-indxOfExp].expertiseLevel)))
              table.getCell(i,2).add(new Paragraph(''+expertises[i-indxOfExp].lastYearOfExperience))
            }          
          }
        return table
      }
    }
    
    getExpertiseLevelAsPlusSign(expertiseLevel:string){
      let result:string
      switch(expertiseLevel){
        case this.resourceService.expertiseLevels.get('exspertiseLevel_1'):
          result = this.getPlusSign(1)
          break

        case this.resourceService.expertiseLevels.get('exspertiseLevel_2'):
          result = this.getPlusSign(2)
          break
          
        case this.resourceService.expertiseLevels.get('exspertiseLevel_3'):
          result = this.getPlusSign(3) 
          break
          
        default:
          result = this.getPlusSign(4)
          break  
      }
       
      return result
    }

    fillExpertiseLevel():Table{
      const table =new Table({
        rows         : 4,
        columns      : 2, 
      })
      
      for(var i=0; i< 4; i++){
        this.removeTableBorder(table.getCell(i,0))       
        table.getCell(i,0).add(new Paragraph({ text: this.getPlusSign(i+1)}))
        this.removeTableBorder(table.getCell(i,1)) 
        let key:string= 'exspertiseLevel_'+(i+1)                  
        table.getCell(i,1).add(new Paragraph({ text: '          '+this.resourceService.expertiseLevels.get(key)}))   
      }
      return table;

    }

    getPlusSign(amount:number){
      let result:string =""
      for(var i=0; i < amount; i++){
        result =result+"+" 
      }
      return result
    }
 

    //Voeg eerste pagina
    addFirstPage(doc:Document, personel:Personel, characteristics:Characteristic[], footerText){
      let textColor:string ='red'     
      const text1 = new TextRun({
        text: "DPA GEOS",
        color: textColor,
      });

      const text2 = new TextRun({
        text: "Wiersedreef 5",
        color: textColor,
      });

      const text3 = new TextRun({
        text: "3433 ZX Nieuwegein",
        color: textColor,
      });

      const adressParagrap = new Paragraph({
        children :[
                   text2.break(),
                   text3.break(),
                 ]
      });
     
    
                                               
      doc.addSection({
        headers: {
          default: new Header({ children: [adressParagrap, new Paragraph(this.addDPALogo(doc)) ]}),
        },
        footers: {
          default: new Footer({children : [new Paragraph({children:[footerText]})] }),
        },
        children:[this.setTitle('  '+this.resourceService.cvresources.get('personelInfoTitle'))
               ,  this.addSpaceBetweenTitleAndConten(100)
               ,  new Paragraph(this.addUserPhoto(doc))
               ,  this.fillPersonelInfo(personel)
               ,  this.addSpaceBetweenTitleAndConten(100)
               ,  this.setTitle('  '+this.resourceService.cvresources.get('globelProfTitle'))
               ,  this.addSpaceBetweenTitleAndConten(100)
               ,  new Paragraph(personel.globelProfile)
               ,  new Paragraph({
                      text   : this.resourceService.cvresources.get('personel-charc'),
                      spacing: {before: 500},                     
                  })
               , this.setpersonelCharacteristics(characteristics)
              
              ], 
      });

    } 

    setpersonelCharacteristics(char:Characteristic[]):Table{
      let rowNumber:number = 0
      char.forEach(ch =>{
        if(!ch.disabled){
          rowNumber = rowNumber + 1
        }
      })
      const table = new Table({
        rows         : rowNumber,
        columns      : 1,   
      });
      
      for(var i=0; i< char.length; i++){
        if(!char[i].disabled){
          this.removeTableBorder(table.getCell(i,0))       
          table.getCell(i,0).add(new Paragraph({ text: char[i].characteristic,
                                                 bullet:{level:0}           
                                              })
                                )
        }
        
      }
      return table;
    }


    addSpaceBetweenTitleAndConten(spaceLevel:number) : Paragraph{
      return new Paragraph({
        text: ' ',
        spacing:{before:spaceLevel}
      })
    }
    //PictureRun
    addUserPhoto(doc:Document){  
      if(this.usercvservice.photoOfSelectedUser != null && this.usercvservice.showUserPhotoInCV){
        return Media.addImage(doc, this.usercvservice.photoOfSelectedUser, 60, 60, {
          floating: {
              horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE,
                                    offset: 5930350,
                                  },
              verticalPosition  : { relative: VerticalPositionRelativeFrom.PAGE,
                                    offset: 1804400,    
                                  },
          },
      });
      }else{
        return ''
      }                              
          
    }

    fillPersonelInfo( personel:Personel):Table{
      const table = new Table({
        rows         : 7,
        columns      : 2,
        width        : 9000,
        widthUnitType: WidthType.DXA,
        columnWidths : [100,200],
        margins      : {top:60},
        layout       : TableLayoutType.AUTOFIT,
          
    });
    
  
      table.getCell(0,0).add(new Paragraph(this.resourceService.cvresources.get('name')))
      table.getCell(0,1).add(new Paragraph(": "+personel.userName))

      table.getCell(1,0).add(new Paragraph(this.resourceService.cvresources.get('birthdate')))
      table.getCell(1,1).add(new Paragraph(": "+_moment(personel.birthDate).format('DD-MM-YYYY')))

      table.getCell(2,0).add(new Paragraph(this.resourceService.cvresources.get('residence')))
      table.getCell(2,1).add(new Paragraph(": "+personel.residence))

      table.getCell(3,0).add(new Paragraph(this.resourceService.cvresources.get('nationality')))
      table.getCell(3,1).add(new Paragraph(": "+personel.nationality))

      table.getCell(4,0).add(new Paragraph(this.resourceService.cvresources.get('hoursAvailabel')))
      table.getCell(4,1).add(new Paragraph(": "+personel.hoursAvailabel))

      table.getCell(5,0).add(new Paragraph(this.resourceService.cvresources.get('currentFunction')))
      table.getCell(5,1).add(new Paragraph(": "+personel.currentFunction))

      table.getCell(6,0).add(new Paragraph(this.resourceService.cvresources.get('itExperienceSince')))
      table.getCell(6,1).add(new Paragraph(": "+personel.itExperienceSince))

      this.modifyTableForPersoneInfo(table)

     return table;
    }
    
   

    removeTableBorder(tableCell : TableCell){
      tableCell.Borders.addBottomBorder(BorderStyle.DOT_DOT_DASH,1,'white')
      tableCell.Borders.addTopBorder(BorderStyle.DOT_DOT_DASH,1,'white')
      tableCell.Borders.addLeftBorder(BorderStyle.DOT_DOT_DASH,1,'white')
      tableCell.Borders.addRightBorder(BorderStyle.DOT_DOT_DASH,1,'white')    
    }

    modifyTableForPersoneInfo(table:Table){
      for(var i =0; i<7; i++){
        this.removeTableBorder(table.getCell(i, 0))
        this.removeTableBorder(table.getCell(i, 1))
        table.getCell(i, 0).setMargins({left:this.leftMagerForTable})
        table.getCell(i, 1).setMargins({right:2500})
        table
     }
    }

    
    setTitle( titleText:string):Table{

      const table = new Table({
        rows   : 1,
        columns: 1,
        width  : 100,
        widthUnitType: WidthType.PERCENTAGE,  
      })
      
      this.removeTableBorder(table.getCell(0,0))
      table.getCell(0,0).setMargins({top:100, bottom:100})
      table.getCell(0,0).setShading({fill:titleText, color:'red', val:ShadingType.SOLID})
      table.getCell(0,0).add(new Paragraph({children:[new TextRun({text: titleText, color:'white' })]}))
      return table

    }

    //Voeg DPA log in het document
     addDPALogo(doc:Document):PictureRun{                                
      return Media.addImage(doc, this.logo, 70, 70, {
        floating: {
            horizontalPosition: {
              relative: HorizontalPositionRelativeFrom.PAGE,               
                offset: 5930350,
            },
            verticalPosition: {
              relative: VerticalPositionRelativeFrom.PAGE,
                offset: 404400,
            },
        }
    });
  
         
    }
   

   async getImage(imageUrl: string): Promise<ArrayBuffer> {
      return await this.http.get(imageUrl, { responseType: 'arraybuffer' }).toPromise();
    }
   
     getDpaLogo() {
       this.http.get<UserCV>(this.messageService.url+"getLogo", this.messageService.requestHeader)
                .subscribe(responseData => { if(responseData){
                                                 this.logo = responseData['userPhoto']   
                                               }
                                           } ,
                           error => console.log('Error: '+error.message)                  
                                             )
    }



    sortExpertiseForEachType(expertises:Expertise[], expertField:Expertise[], progLanguage:Expertise[], databases:Expertise[], tools:Expertise[], methodes:Expertise[]
      ,frameworks:Expertise[], testing:Expertise[], servers:Expertise[], ide:Expertise[]){
        expertises.forEach(exp=>{
          switch(exp.expertiseType){
            case this.resourceService.cvresources.get('expertField'):
                       expertField.push(exp)
                       break;

                  case this.resourceService.cvresources.get('progLanguage'):
                       progLanguage.push(exp)
                       break;

                  case this.resourceService.cvresources.get('databases'):                                           
                       databases.push(exp)
                       break;

                  case this.resourceService.cvresources.get('tools'):                                           
                       tools.push(exp)
                      break;     

                  case this.resourceService.cvresources.get('methodes'):
                       methodes.push(exp)
                      break;  
                  
                  case this.resourceService.cvresources.get('frameworks'):
                       frameworks.push(exp)
                       break;
                      
                  case this.resourceService.cvresources.get('testing'):
                       testing.push(exp)
                      break;    

                  case this.resourceService.cvresources.get('servers'):
                       servers.push(exp)
                       break; 

                  case this.resourceService.cvresources.get('ide'):
                       ide.push(exp)
                       break; 
          }
        })                              

   }
    
}
