import { TestBed } from '@angular/core/testing';

import { TaslService } from './task.service';

describe('TaslService', () => {
  let service: TaslService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaslService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
