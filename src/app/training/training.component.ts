import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { ResourceService } from '../services/resource.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  constructor(public trainingService  : TrainingService,
              public resourceService  : ResourceService,
              public validatorService : ValidatorService
              ) { }

  ngOnInit() {
  }

}
