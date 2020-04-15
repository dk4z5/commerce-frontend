import { TestBed } from '@angular/core/testing';

import { CustomPaginatorService } from './custom-paginator.service';

describe('CustomPaginatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomPaginatorService = TestBed.get(CustomPaginatorService);
    expect(service).toBeTruthy();
  });
});
