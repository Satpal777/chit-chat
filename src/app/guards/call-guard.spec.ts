import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { callGuard } from './call-guard';

describe('callGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => callGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
