import { TestBed } from '@angular/core/testing';

import { CompanyUserAuthenticatedGuard } from './company-user-authenticated.guard';

describe('CompanyUserAuthenticatedGuard', () => {
  let guard: CompanyUserAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompanyUserAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
