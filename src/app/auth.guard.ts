import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  constructor(private authService: AuthService, private router: Router,private afAuth: AngularFireAuth) {}

  async canActivate() {

    // console.log(this.authService.getUser());
    if (await this.authService.isLoggedIn()) {
      console.log((this.afAuth.currentUser))
      return true; // Utilizatorul este autentificat, permiteți accesul
    } else {
      console.log('not ok');
      this.router.navigate(['/login']);
      return false; // Utilizatorul nu este autentificat, redirecționați către pagina de login
    }
  }

}
