import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setari',
  templateUrl: './setari.page.html',
  styleUrls: ['./setari.page.scss'],
})
export class SetariPage implements OnInit {

  details: any;
  openSections: Record<string, boolean> = {};
  repere: any[] = [];
  items: any[] = [];
  email: string = '';
  password: string = '';

  editMode: boolean = false;

  constructor(private firestore: AngularFirestore, private alertController: AlertController,private dataService: DataService,  private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    if (this.router?.getCurrentNavigation()?.extras.state) {
      this.details = this.router.getCurrentNavigation()?.extras?.state?.['myObject'];
      console.log('detail',this.details);
  }
  this.incarcaRepere();
  this.incarcaItems();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  incarcaRepere() {
    // Încarcă toate reperele de la calea "/punctedelucru/AFI/limite/"
    this.firestore
      .collection(`/punctedelucru/${this.details.nume}/limite/`)
      .valueChanges()
      .subscribe((data: any[]) => {
        this.repere = data;
        console.log(this.repere);
      });
  }

  onBackClicked() {
    this.dataService.clearAll();
    console.log('okok');
  }

  toggleSection(section: string) {
    this.openSections[section] = !this.openSections[section];
  }

  isSectionOpen(section: string) {
    return this.openSections[section] || false;
  }

  salveazaModificari() {
    // Salvare modificări în Firestore pentru toate reperele
    for (const reper of this.repere) {
      this.firestore
        .doc(`/punctedelucru/${this.details.nume}/limite/${reper.nume}`)
        .update({ limita: reper.limita })
        .then(() => {
          console.log(`Cantitatea pentru reperul ${reper.nume} a fost actualizată.`);
        })
        .catch((error) => {
          console.error(`Eroare la actualizarea cantității pentru reperul ${reper.nume}:`, error);
        });
    }
  }

  incarcaItems() {
    // Încarcă toate reperele de la calea "/punctedelucru/AFI/limite/"
    this.firestore
      .collection(`/punctedelucru/${this.details.nume}/repere/`)
      .valueChanges()
      .subscribe((data: any[]) => {
        this.items = data;
        console.log(this.repere);
      });
  }

  salveazaModificariPreturi() {
    // Salvare modificări în Firestore pentru toate reperele
    for (const item of this.items) {
      this.firestore
        .doc(`/punctedelucru/${this.details.nume}/limite/${item.nume}`)
        .update({ pret: item.pret })
        .then(() => {
          console.log(`Cantitatea pentru reperul ${item.nume} a fost actualizată.`);
        })
        .catch((error) => {
          console.error(`Eroare la actualizarea cantității pentru reperul ${item.nume}:`, error);
        });
    }
  }


  async registerUser() {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      const userDocRef = this.firestore.collection('users').doc(result?.user?.uid);
      await userDocRef.set({
        email: this.email,
        punctdelucru: this.details.nume,
      });
      const alert = await this.alertController.create({
        header: 'Succes!',
        message: 'ok',
        buttons: ['OK'],
      });

      await alert.present();
      // Utilizatorul a fost creat cu succes
      window.location.reload();
      console.log('Utilizator creat:', result.user);
      // Aici poți naviga utilizatorul către o altă pagină sau să faci orice altă acțiune
    } catch (error) {
      console.error('Eroare la înregistrare:', error);
      // Tratează eroarea sau afișează un mesaj de eroare utilizatorului
    }
  }



}
