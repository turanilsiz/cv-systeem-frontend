import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../services/certificate.service';
import { ResourceService } from '../services/resource.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  constructor(public certificateService : CertificateService,
              public resourceService    : ResourceService,
              public validatorService   : ValidatorService
             ) { }

  ngOnInit() {
  }

}
