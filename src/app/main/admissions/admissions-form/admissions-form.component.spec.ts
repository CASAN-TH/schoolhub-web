import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionsFormComponent } from './admissions-form.component';

describe('AdmissionsFormComponent', () => {
  let component: AdmissionsFormComponent;
  let fixture: ComponentFixture<AdmissionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
