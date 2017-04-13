import { TestBed, inject } from '@angular/core/testing';

import { HeadTeacherService } from './head-teacher.service';

describe('HeadTeacherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadTeacherService]
    });
  });

  it('should ...', inject([HeadTeacherService], (service: HeadTeacherService) => {
    expect(service).toBeTruthy();
  }));
});
