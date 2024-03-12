import { TestBed } from '@angular/core/testing';

import { TransposeConfigService } from './transpose-config.service';

describe('TransposeConfigService', () => {
  let service: TransposeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransposeConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
