//Librerias e llamados a componentes
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  UrlSegment,
  UrlTree,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

/*
* ¿Qué es Injectable?*
  Es una decoraador que Angular pone sobre un servicio (o clase)
  y le da la capacidad de manejar la inyección de dependencias.
*/
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  //Validación de uatenticacion
  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuthenticated) => console.log("Authenticated:", isAuthenticated)),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(["./auth/login"]);
        }
      }),
    );
  }

  /*
   * para que sirve
   */
  canMatch(
    route: Route,
    segments: UrlSegment[],
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> {
    // console.log('Can Activate');
    // console.log({ route, state })

    return this.checkAuthStatus();
  }
}
