import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any| null>;

  constructor(private afAuth: AngularFireAuth, ) {
    this.user$ = afAuth.authState;
  }

  // Metoda de înregistrare
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Metoda de autentificare
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Metoda de ieșire din sistem
  logout() {
    return this.afAuth.signOut();
  }

  async isLoggedIn()  {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        return true;
      } else {
       return false;
      }
    } catch (error) {
     return false;
    }
  }
    // Verificați starea de autentificare a utilizatorului și returnați true sau false
    // Puteți utiliza metodele din serviciul Firebase Auth sau alt serviciu de autentificare aici
    // Exemplu:



  async getUser() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        console.log('Utilizator curent:', user);
        return user;
      } else {
        console.log('Nu există utilizator curent.');
        return undefined;
      }
    } catch (error) {
      console.error('Eroare la obținerea utilizatorului curent:', error);
      return undefined;
    }
  }
}
