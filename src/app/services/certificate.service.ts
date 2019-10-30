import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { CaseListDatasource } from '../case-list-datasource';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { Certificate } from '../models/certificate';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange, } from '@angular/material';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  certificates : Certificate[] = [] 
  selection = new SelectionModel<Certificate>(true, []);  

  certificateForm:FormGroup = new FormGroup({
    year             : new FormControl('',[Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
    institute        : new FormControl('',[Validators.required, Validators.maxLength(500)]),
    certificate      : new FormControl('',[Validators.required, Validators.maxLength(500)]),
  });

  //Certificate 
  displayedColumnsCertificate: string[] = ['year', 'institute','certificate', 'removeCertificate', 'disable'];
  columnsToDisplayCertificate: string[] = this.displayedColumnsCertificate.slice();
  subjectCertificate = new BehaviorSubject(this.certificates);
  dataSourceCertificate = new CaseListDatasource(this.subjectCertificate.asObservable());

  constructor(private messageService:MessageService) { }

    //Certicate
    addCertificateToTable(){
      if(this.certificateForm.valid){
        this.certificates.push(this.certificateForm.value);
        this.subjectCertificate.next(this.certificates);
        this.dataSourceCertificate = new CaseListDatasource(new BehaviorSubject(this.certificates).asObservable());
        this.certificateForm.reset();
      }else{
        this.messageService.showFormErrorMessage(this.messageService.messages.get('formDataError'), 'Certificate Gegevens', 'error', 'ok', false, this.certificateForm)
      }
    }
    
    removeCerticateFromTable(row){
      this.certificates = this.certificates.filter(obj => row != obj);
      this.subjectCertificate.next(this.certificates);
      this.dataSourceCertificate = new CaseListDatasource(new BehaviorSubject(this.certificates).asObservable());
    }

    onCheckboxChagen(event: MatCheckboxChange) {
   
      var idOfCheckedCertificate = +event.source.value['id'];
      this.certificates.forEach( certificate =>{
           if(certificate.id == idOfCheckedCertificate){
             certificate.disabled = !certificate.disabled
           }
      })
    }
  
    getValue(row?: Certificate) {
      return row;
    }
}
