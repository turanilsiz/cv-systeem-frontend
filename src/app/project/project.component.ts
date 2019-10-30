import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ResourceService } from '../services/resource.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(public projectService   : ProjectService,
              public  resourceService : ResourceService,
              public  validatorService: ValidatorService) { }

  ngOnInit() {
  }

}
