import { TestBed } from '@angular/core/testing';

import { RemoveBGService } from './remove-bg.service';

describe('RemoveBGService', () => {
  let service: RemoveBGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveBGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
