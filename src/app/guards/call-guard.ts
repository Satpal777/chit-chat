import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Webrtc } from '../services/webrtc';

export const callGuard: CanActivateFn = (route, state) => {
  const webrtcService = inject(Webrtc);
  const router = inject(Router);

  // Allow access only if user has started local stream or has active peer connection
  if (webrtcService.isLocalStreamActive() || webrtcService.isPeerConnectionActive()) {
    return true;
  }

  // Redirect to home if trying to access call page without active connection
  router.navigate(['/']);
  return false;
};
