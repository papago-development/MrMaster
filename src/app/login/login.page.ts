import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  ngOnInit() {
  }


  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router, private navCtrl: NavController) {}

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      // Autentificare reușită, navigați către pagina dorită
      this.router.navigateByUrl('/tabs/tab3');
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      // Tratați eroarea și afișați un mesaj utilizatorului
    }
  }

  navigateToTab3() {
    this.navCtrl.navigateRoot('/tabs/tab3'); // Schimbați ruta în funcție de nevoile dvs.
  }

  onBackClicked() {

    console.log('okok');
  }

}
