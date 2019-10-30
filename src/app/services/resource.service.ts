import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  cvresources     = new Map();
  expertiseLevels = new Map()


  languageLevels = []
  expertiseTypes = []  
  expertiseLevelSelect = []              


  constructor() { 
    
  }

  initilizeCVResources(selectedLanguage:string){
     if(selectedLanguage == 'nl'){
         
         //Persoonlijke Gegevens
         this.cvresources.set('personelInfo'           , 'Persoonlijke Gegevens'       )
         this.cvresources.set('birthdate'              , 'Geboortedatum'               )
         this.cvresources.set('residence'              , 'Woonplaats'                  )
         this.cvresources.set('nationality'            , 'Nationaliteit '              )
         this.cvresources.set('hoursAvailabel'         , 'Uren beschikbaar'            )
         this.cvresources.set('currentFunction'        , 'Huidige functie'             )
         this.cvresources.set('itExperienceSince'      , 'ICT-ervaring sinds'          )
         this.cvresources.set('globelProfile'          , 'Globale profielschets'       )
         this.cvresources.set('characteristic'         , 'Kenmerken'                   )

        //expertise levels 
        this.expertiseLevels.set('exspertiseLevel_1'  , 'redelijke kennis'             )
        this.expertiseLevels.set('exspertiseLevel_2'  , 'goede kennis'                 )
        this.expertiseLevels.set('exspertiseLevel_3'  , 'zeer goede kennis'            )
        this.expertiseLevels.set('exspertiseLevel_4'  , 'specialist'                   )  

        this.expertiseLevelSelect=[{value:'redelijke kennis'  , viewValue:'redelijke kennis' }
                                ,  {value:'goede kennis'      , viewValue:'goede kennis'     }
                                ,  {value:'zeer goede kennis' , viewValue:'zeer goede kennis'}
                                ,  {value:'specialist'        , viewValue:'specialist'       }
                                  ]
          
        this.cvresources.set('expertiseHeader'        , 'EXPERTIESE'                  )        
        this.cvresources.set('description'            , 'Omschrijving'                )

        this.cvresources.set('expertiseLevel'         , 'Niveau'                      )
        this.cvresources.set('lastYearOfExperience'   , 'Laatste ervaringsjaar'       )
        this.cvresources.set('expertiseType'          , 'Soort expertise'             )
        this.cvresources.set('description'            , 'Omschrijving'                )
        
        this.cvresources.set('expertiseType'          , 'Soort expertise')
        this.cvresources.set('expertField'            , 'Deskundige vaak'             )
        this.cvresources.set('progLanguage'           , 'Programmeertalen'            )
        this.cvresources.set('databases'              , 'Databases'                   )
        this.cvresources.set('tools'                  , 'Tools'                       )
        this.cvresources.set('methodes'               , 'Methodes'                    )
        this.cvresources.set('frameworks'             , 'Frameworks'                  )
        this.cvresources.set('testing'                , 'Testen'                      )
        this.cvresources.set('servers'                , 'Web / application server'    )
        this.cvresources.set('ide'                    , 'IDE'                         )


         //Opleidingen
         this.cvresources.set('educations'             ,'Opleidingen'                 )
         this.cvresources.set('startDate'              ,'Begindatum'                  )
         this.cvresources.set('endDate'                ,'Einddatum'                   )
         this.cvresources.set('result'                 ,'Resultaat'                   )
         this.cvresources.set('education'              ,'Opleiding'                   )

         //Trainingen
         this.cvresources.set('trainings'              ,'Trainingen'                  )
         this.cvresources.set('year'                   ,'Jaar'                        )
         this.cvresources.set('institute'              ,'Instituut'                   )
         this.cvresources.set('training'               ,'Training'                    )
        
         //Certificaten
         this.cvresources.set('certificates'           , 'Certificaten'               )
         this.cvresources.set('certificate'            , 'Certificaat'                )

         //Talenbeheersing
         this.cvresources.set('languageProficiency'    , 'Talenbeheersing'            )
         this.cvresources.set('userLanguage'           , 'Taal'                       )
         this.cvresources.set('speak'                  , 'Spraak'                     )
         this.cvresources.set('write'                  , 'Schrijven'                  )
         this.cvresources.set('read'                   , 'Lezen'                      )
         
         this.languageLevels = [{value: 'Moedertaal'   , viewValue: 'Moedertaal'}
                               ,{value: 'Vloeiend'     , viewValue: 'Vloeiend'  } 
                               ,{value: 'Goed'         , viewValue: 'Goed'      } 
                               ,{value: 'Voldoende'    , viewValue: 'Voldoende' } 
                               ,{value: 'Matig'        , viewValue: 'Matig'     } 
                              ]
          
         //Werkervaring
         this.cvresources.set('workExperince'          , 'Werkervaring'               )
         this.cvresources.set('function'               , 'Functie'                    )
         this.cvresources.set('company'                , 'Organisatie'                )
                          
         //Project ervaringen
         this.cvresources.set('projectExperience'      , 'Projectervaring'            )
         this.cvresources.set('projectName'            , 'Opdracht'                   )
         this.cvresources.set('client'                 , 'Opdrachtgever'              )
         this.cvresources.set('role'                   , 'Rol'                        )
         this.cvresources.set('activity'               , 'Activiteit '                )
         this.cvresources.set('tools'                  , 'Tools'                      )  
        
         //Algemene dingen
         this.cvresources.set('next'                   , 'Volgende'                   )
         this.cvresources.set('back'                   , 'Terug'                      )
         this.cvresources.set('notempty'               , ' mag niet leeg zijn'        )
         this.cvresources.set('maxLength'              , ' maximum length '            )
         this.cvresources.set('minLength'              , ' minimum length '            )
         this.cvresources.set('add'                    , 'Toevoegen'                  )
         this.cvresources.set('delete'                 , 'Verwijderen'                )
         this.cvresources.set('send'                   , 'Verzenden'                  )
         this.cvresources.set('done'                   , 'Klaar'                      )
         this.cvresources.set('donecv'                 , 'U bent klaar'               )
         this.cvresources.set('tableNote'              , '* Om kolom waarde te wijzigen dubbel klikken op text !!' )
         this.cvresources.set('disable'                , 'Uitzetten'                  )
         this.cvresources.set('name'                   , 'Naam'                       )
         this.cvresources.set('colon'                  , ':'                          )
         this.cvresources.set('footerText1'            , 'All services by or on behalf of GEOS IT Professionals B.V. (Chamber of Commerce number:27165417) are subject to its Algemene Voorwaarden (General Terms and Conditions), ')
         this.cvresources.set('footerText2'            , 'which will be forwarded upon request.')
         this.cvresources.set('page'                   , 'pagina '                    )
         this.cvresources.set('personel-charc'         , 'Persoonlijke kenmerken:'    )
         this.cvresources.set('personelInfoTitle'      , 'PERSONLIJKE GEGEVENS'       )
         this.cvresources.set('globelProfTitle'        , 'GLOBALE PROFIELSCHETS'      )
         this.cvresources.set('educationAndTrainig'    , 'OPLEIDINGEN EN TRAININGEN'  )
         this.cvresources.set('prev-education'         , 'Vooropleidingen :'          )
         this.cvresources.set('educ-tr-curs'           , 'Vakgerichte opleidingen, trainingen en cursussen :')
         this.cvresources.set('certificatesTitle'      ,'CERTIFICATEN'                )
         this.cvresources.set('languageTitle'          , 'TALENBEHEERSING'            )
         this.cvresources.set('workExperinceTitle'     , 'WERKERVARING'               )
         this.cvresources.set('projectExperince'       , 'PROJECTERVARING'            )
         this.cvresources.set('period'                 , 'Periode'                    )
         this.cvresources.set('cv-without-photo'       , 'CV zonder photo '           )
         this.cvresources.set('present'                , 'heden'                      )
         this.cvresources.set('industry'               , 'Branche'                    )
         this.cvresources.set('invalid'                , ' is ongeldig'               )
     }else{
         //Personal information
         this.cvresources.set('personelInfo'           , 'Personal information'       )
         this.cvresources.set('birthdate'              , 'Date of birth'              )
         this.cvresources.set('residence'              , 'Residence'                  )
         this.cvresources.set('nationality'            , 'Nationality '               )
         this.cvresources.set('hoursAvailabel'         , 'Hours available'            )
         this.cvresources.set('currentFunction'        , 'Current function'           )
         this.cvresources.set('itExperienceSince'      , 'IT experience since'        )
         this.cvresources.set('globelProfile'          , 'Global profile'             )
         this.cvresources.set('characteristic'         , 'Features'                   )

         //expertise levels
         this.expertiseLevels.set('exspertiseLevel_1'  , 'reasonable knowledge'       )
         this.expertiseLevels.set('exspertiseLevel_2'  , 'good knowledge'             )
         this.expertiseLevels.set('exspertiseLevel_3'  , 'very good knowledge'        )
         this.expertiseLevels.set('exspertiseLevel_4'  , 'specialist'                 )

         this.expertiseLevelSelect=[{value:'reasonable knowledge' , viewValue:'reasonable knowledge'}
                                ,   {value:'good knowledge'       , viewValue:'good knowledge'      }
                                ,   {value:'very good knowledge'  , viewValue:'very good knowledge' }
                                ,   {value:'specialist'           , viewValue:'specialist'          }
                                  ]
         
         this.cvresources.set('expertiseHeader'        , 'EXPERTISE'                   )
         this.cvresources.set('description'            , 'Description'                 )
         this.cvresources.set('expertiseLevel'         , 'Level'                       )
         this.cvresources.set('expertiseType'          , 'Expertise type'              )
         this.cvresources.set('lastYearOfExperience'   , 'Last year of experience'     )
         
         this.cvresources.set('expertiseType'          , 'Expertise type'              )
         this.cvresources.set('expertField'            , 'Expert field'                )
         this.cvresources.set('progLanguage'           , 'Programming languages'       )
         this.cvresources.set('databases'              , 'Databases'                   )
         this.cvresources.set('tools'                  , 'Tools'                       )
         this.cvresources.set('methodes'               , 'Methodes'                    )
         this.cvresources.set('frameworks'             , 'Frameworks'                  )
         this.cvresources.set('testing'                , 'Testing'                     )
         this.cvresources.set('servers'                , 'Web / application server'    )
         this.cvresources.set('ide'                    , 'IDE'                         )

       

         //Educations
         this.cvresources.set('educations'             , 'Educations'                  )
         this.cvresources.set('startDate'              , 'Starting date'               )
         this.cvresources.set('endDate'                , 'End date'                    )
         this.cvresources.set('result'                 , 'Result'                      )
         this.cvresources.set('education'              , 'Education'                   )

         //Trainingen
         this.cvresources.set('trainings'              , 'Trainings'                   )
         this.cvresources.set('year'                   , 'Year'                        )
         this.cvresources.set('institute'              , 'Institute'                   )
         this.cvresources.set('training'               , 'Training'                    )

         //Certificates
         this.cvresources.set('certificates'           , 'Certificates'                )
         this.cvresources.set('certificate'            , 'Certificate'                 )

         //Language proficiency
         this.cvresources.set('languageProficiency'    , 'Language proficiency'        )
         this.cvresources.set('userLanguage'           , 'Language'                    )
         this.cvresources.set('speak'                  , 'Speak'                       )
         this.cvresources.set('write'                  , 'Write'                       )
         this.cvresources.set('read'                   , 'Read'                        )
         this.languageLevels = [{value: 'Native Language', viewValue: 'Native Language'}
                               ,{value: 'Fluent'         , viewValue: 'Fluent'} 
                               ,{value: 'Good'           , viewValue: 'Good'} 
                               ,{value: 'Moderate'       , viewValue: 'Moderate'} 
                               ,{value: 'Basic'          , viewValue: 'Basic'} 
                              ]
        
         //Work experience
         this.cvresources.set('workExperince'          , 'Work experience'             )
         this.cvresources.set('function'               , 'Function'                    )
         this.cvresources.set('company'                , 'Organisation'                )
        
         //Project experince
         this.cvresources.set('projectExperience'      , 'Project experince'           )
         this.cvresources.set('projectName'            , 'Project name'                )
         this.cvresources.set('client'                 , 'Client'                      )
         this.cvresources.set('role'                   , 'Role'                        )
         this.cvresources.set('activity'               , 'Activity'                    )
         this.cvresources.set('tools'                  , 'Tools'                       ) 

         //Generall Purpose
         this.cvresources.set('next'                   , 'Next'                        )
         this.cvresources.set('back'                   , 'Back'                        )
         this.cvresources.set('add'                    , 'Add'                         )
         this.cvresources.set('delete'                 , 'Delete'                      )
         this.cvresources.set('send'                   , 'Send'                        )
         this.cvresources.set('notempty'               , ' cannot be empty'            )
         this.cvresources.set('maxLength'              , ' maximum length '             )
         this.cvresources.set('minLength'              , ' minimum length '             )
         this.cvresources.set('done'                   , 'Done'                        )
         this.cvresources.set('donecv'                 , 'You are done'                )
         this.cvresources.set('tableNote'              , '* To change colums value click twice on text in it !!' )
         this.cvresources.set('disable'                , 'Disable'                     )
         this.cvresources.set('name'                   , 'Name'                        )
         this.cvresources.set('colon'                  , ':'                           )
         this.cvresources.set('footerText1'            , 'All services by or on behalf of GEOS IT Professionals B.V. (Chamber of Commerce number:27165417) are subject to its Algemene Voorwaarden (General Terms and Conditions), ')
         this.cvresources.set('footerText2'            , 'which will be forwarded upon request.')
         this.cvresources.set('page'                   , 'page '                       )
         this.cvresources.set('personel-charc'         , 'Personal characteristics:'   )
         this.cvresources.set('personelInfoTitle'      , 'PERSONAL INFORMATION'        )
         this.cvresources.set('globelProfTitle'        , 'GLOBAL PROFILE'              )
         this.cvresources.set('educationAndTrainig'    , 'EDUCATION AND TRAINING '     )
         this.cvresources.set('prev-education'         , 'Previous educations : '      )
         this.cvresources.set('educ-tr-curs'           , 'Branch-oriented courses, trainings and educations :')
         this.cvresources.set('certificatesTitle'      , 'CERTIFICATE'                 )
         this.cvresources.set('languageTitle'          , 'LANGUAGE PROFICIENCY'        )
         this.cvresources.set('workExperinceTitle'     , 'WORK EXPERIENCE'             )
         this.cvresources.set('projectExperince'       , 'PROJECT EXPERIENCE'          )
         this.cvresources.set('period'                 , 'Period of time'              )
         this.cvresources.set('cv-without-photo'       , 'CV without photo'            )
         this.cvresources.set('present'                , 'present'                     )
         this.cvresources.set('industry'               , 'Industry'                    )
         this.cvresources.set('invalid'                , ' is not valid'               )
     } 
  }
}
