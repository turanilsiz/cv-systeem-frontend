import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';
import Swal, { SweetAlertType, SweetAlertResult } from 'sweetalert2'
import { FormGroup, ValidationErrors } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class MessageService {
  //url:string = 'http://localhost:8080/';
  url:string = 'https://dpa-geos-cv-systeem.herokuapp.com/'
  token:string="";
   requestHeader :{headers:HttpHeaders};
   
   messages = new Map();
 
  //horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  //verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar,) { 
    this.messages.set('ok'                        , 'OK')
    this.messages.set('deleteText'                , 'Verwijderen')
    this.messages.set('cancelText'                , 'Annuluren')
    this.messages.set('confirmButtonColor'        , '#32CD32')
    this.messages.set('cancelButtonColor'         , '#d33')
    this.messages.set('loginError'                , 'Gebruiker of wachtwoord ongeldig')
    this.messages.set('emptyCV'                   , 'Gebruiker heeft geen CV')
    this.messages.set('userAdded'                 , 'Gebruiker is toegevoegd')
    this.messages.set('userAddError'              , 'Gebruiker kan niet toegeovegd worden')
    this.messages.set('getAllUserError'           , 'Gebruikers kunnene niet opgehaald worden')
    this.messages.set('formDataError'             , 'Ongeldige gegevens')
    this.messages.set('deleteUserConfirmation'    , 'Weet u zeker dat u deze gebruiker wil verwijderen')
    this.messages.set('revertActieon'             , 'U kunt deze actie niet terugdraaien')
    this.messages.set('deleted'                   , 'Verwijderd')
    this.messages.set('deleteUserSucces'          , 'Gebruiker is verwijderd')
    this.messages.set('deleteUserError'           , 'Gebruiker kan niet verwijderd worden')
    this.messages.set('saveData'                  , 'Data is opgeslagen')
    this.messages.set('saveDataError'             , 'Data kan niet opgeslagen worden')
    this.messages.set('showDataError'             , 'Data kan niet getoond worden ')
    this.messages.set('existError'                , ' bestaat al !!')
    this.messages.set('emptyError'                , ' mag niet leeg zijn')
    this.messages.set('email'                     , ' is ongeldig email adress')
    this.messages.set('maxLength'                 , ' max lengthe 1000 karakter')
    this.messages.set('minlength'                 , ' min lengthe 1 karakter')
    this.messages.set('userNameNotExists'         , 'Gebruiker naam bestaat niet!!')
    this.messages.set('passwordActivation'        , 'Reset link aan gegeven email adress gestuurd')
  }

  showMessage(title:string, text:string, type:SweetAlertType, confirmButtonTextKey:string,  showCancelButton:boolean):Promise<SweetAlertResult>{
    return Swal.fire({ title: title,
                       text: text,
                       type: type,
                       showCancelButton: showCancelButton,
                       confirmButtonColor: this.messages.get('confirmButtonColor'),
                       cancelButtonColor: this.messages.get('cancelButtonColor'),
                       cancelButtonText:this.messages.get('cancelText'),
                       confirmButtonText: this.messages.get(confirmButtonTextKey)
                      }
                    )
  }
  
  showFormErrorMessage(title:string, text:string, type:SweetAlertType, confirmButtonTextKey:string,  showCancelButton:boolean, formGroup:FormGroup):Promise<SweetAlertResult>{
    Object.keys(formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;
      if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              text = text+' - '+key+ ' - '+ keyError
              return this.showMessage(title, text, type, confirmButtonTextKey, showCancelButton)
             
            });
       }
        });
       return null;
  }


  getErrorMessage(placeHolder:string, formControlName:string, formGroup:FormGroup) {
    return formGroup.controls[formControlName].hasError('required') || formGroup.controls[formControlName].hasError('validString')  ? placeHolder+this.messages.get('emptyError') :
           formGroup.controls[formControlName].hasError('incorrect') ? placeHolder+this.messages.get('existError') :
           formGroup.controls[formControlName].hasError('email') ? placeHolder+this.messages.get('email') :
           formGroup.controls[formControlName].hasError('maxlength') ? placeHolder+this.messages.get('maxLength') :
           formGroup.controls[formControlName].hasError('minlength') ? placeHolder+this.messages.get('minlength') :
            '';
           
  }
 
  showMessageForSelectedUserCV():Promise<SweetAlertResult>{
    let map = new Map()
    map.set('word','WORD bestand')
    map.set('pdf' ,'PDF bestand')
    return Swal.fire( {
                        title: 'Kies bestandstype',
                        input: 'radio',
                        inputOptions: map,
                        showCancelButton: true,
                        confirmButtonColor: this.messages.get('confirmButtonColor'),
                        cancelButtonColor: this.messages.get('cancelButtonColor'),
                        cancelButtonText:this.messages.get('cancelText'),
                        inputValidator: (value) => {
                          if (!value) {
                            return 'U moet het bestandstype kiezen!'
                          }
                        }
                     }
                   );
  }

}
