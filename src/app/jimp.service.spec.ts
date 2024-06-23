import { TestBed } from '@angular/core/testing';

import { JimpService } from './jimp.service';

describe('JimpService', () => {
  let service: JimpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JimpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
