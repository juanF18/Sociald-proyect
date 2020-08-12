import { TestBed } from '@angular/core/testing';

import { CloudImgService } from './cloud-img.service';

describe('CloudImgService', () => {
  let service: CloudImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
