import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number; // Make it optional to avoid undefined errors
}

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken = jwtDecode<JwtPayload>(token);

    if (!decodedToken.exp) {
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    const expiredDate = decodedToken.exp * 1000;
    const currentDate = new Date().getTime();

    if (expiredDate < currentDate) {
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    } else {
      if (user.roles.includes('Writer')) {
        return true;
      } else {
        alert('You are not authorized to access this page');
        return false;
      }
    }
  } else {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
};
