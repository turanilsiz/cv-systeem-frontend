import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCvComponent } from './user-cv.component';

describe('UserCvComponent', () => {
  let component: UserCvComponent;
  let fixture: ComponentFixture<UserCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
