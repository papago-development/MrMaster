import { TestBed } from '@angular/core/testing';

import { AngularfirestoreService } from './angularfirestore.service';

describe('AngularfirestoreService', () => {
  let service: AngularfirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularfirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
