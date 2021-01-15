import { TestBed } from '@angular/core/testing';

import { CosmetologistServiceService } from './cosmetologist-service.service';

describe('CosmetologistServiceService', () => {
  let service: CosmetologistServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosmetologistServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
