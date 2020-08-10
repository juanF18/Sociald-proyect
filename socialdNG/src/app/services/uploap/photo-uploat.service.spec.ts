import { TestBed } from '@angular/core/testing';

import { PhotoUploatService } from './photo-uploat.service';

describe('PhotoUploatService', () => {
  let service: PhotoUploatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoUploatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
