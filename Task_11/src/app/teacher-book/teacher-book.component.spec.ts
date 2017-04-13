import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBookComponent } from './teacher-book.component';

describe('TeacherBookComponent', () => {
  let component: TeacherBookComponent;
  let fixture: ComponentFixture<TeacherBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
