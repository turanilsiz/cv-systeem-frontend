import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { ResourceService } from '../services/resource.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(public languageService  : LanguageService,
              public resourceService  : ResourceService,
              public validatorService : ValidatorService
    ) { }

  ngOnInit() {
  }

}
