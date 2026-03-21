import { ActivatedRouteSnapshot,CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth.service';




export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(Auth);
  const router =inject(Router);

  const allowedRoles = route.data?.['roles'] as string[];

  const userRole = authService.getRole();

  if(!authService.isLoggedIn()){
    router.navigate(['/login']);
    return false;
  }

  if(allowedRoles && allowedRoles.includes(userRole)){
    return true;
  }

  router.navigate(['/dashboard']);
  return false;


};
