import { TestBed } from '@angular/core/testing';

import { MatFileInputService } from './mat-file-input.service';

describe('MatFileInputService', () => {
  let service: MatFileInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatFileInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
