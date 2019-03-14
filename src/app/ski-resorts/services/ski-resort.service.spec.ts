import { TestBed, inject } from '@angular/core/testing';

import { SkiResortService } from './ski-resort.service';

describe('SkiResortService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkiResortService]
    });
  });

  it('should be created', inject([SkiResortService], (service: SkiResortService) => {
    expect(service).toBeTruthy();
  }));
});
