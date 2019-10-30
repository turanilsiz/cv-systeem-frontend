import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../services/resource.service';
import { EducationService } from '../services/education.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  constructor(public resourceService  : ResourceService,
              public educationService : EducationService,
              public validatorService : ValidatorService
              ) { }

  ngOnInit() {
  }

}
