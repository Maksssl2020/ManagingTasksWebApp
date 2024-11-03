import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);

  if (authenticationService.currentUser()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${
          authenticationService.currentUserSubject.getValue()?.token
        }`,
      },
    });
  }

  return next(req);
};
