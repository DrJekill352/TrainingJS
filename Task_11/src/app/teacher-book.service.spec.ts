import { TestBed, inject } from '@angular/core/testing';

import { TeacherBookService } from './teacher-book.service';

describe('TeacherBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherBookService]
    });
  });

  it('should ...', inject([TeacherBookService], (service: TeacherBookService) => {
    expect(service).toBeTruthy();
  }));
});
