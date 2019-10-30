import { Component, OnInit } from '@angular/core';
import { WorkService } from '../services/work.service';
import { ResourceService } from '../services/resource.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  constructor(public workService : WorkService,
              public resourceService : ResourceService,
              public validatorService: ValidatorService) { }

  ngOnInit() {
  }

}
