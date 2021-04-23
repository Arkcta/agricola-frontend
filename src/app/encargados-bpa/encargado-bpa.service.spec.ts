import { TestBed } from '@angular/core/testing';

import { EncargadoBPAService } from './encargado-bpa.service';

describe('EncargadoBPAService', () => {
  let service: EncargadoBPAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncargadoBPAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
