import { TestBed } from '@angular/core/testing';

import { CaregoryService } from './caregory.service';

describe('CaregoryService', () => {
  let service: CaregoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaregoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
