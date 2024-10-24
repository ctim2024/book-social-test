import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { inject } from '@angular/core';


export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token:string = inject(TokenService).token;
  const excludedUrls = [
    '/api/v1/auth/authenticate',
    '/api/v1/auth/register',
    '/api/v1/auth/activate-account'
  ];

    // Check if the request URL is in the excluded list
  if (excludedUrls.some(url => req.url.includes(url))) {
      // If the URL is excluded, skip the interceptor logic
      return next(req);
    }
    
  if (token) {

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(authReq);
  }
  return next(req);
};
