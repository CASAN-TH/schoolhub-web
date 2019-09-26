import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCoursesComponent } from './students-courses.component';

describe('StudentsCoursesComponent', () => {
  let component: StudentsCoursesComponent;
  let fixture: ComponentFixture<StudentsCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
