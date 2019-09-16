import { TestBed } from '@angular/core/testing';

import { AdmissionsService } from './admissions.service';

describe('AdmissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmissionsService = TestBed.get(AdmissionsService);
    expect(service).toBeTruthy();
  });
});
