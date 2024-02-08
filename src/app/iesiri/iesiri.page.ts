import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Article } from '../article.interface';

import { AuthService } from '../auth.service';
import { AngularfirestoreService } from '../angularfirestore.service';
import { EroaremodalPage } from '../eroaremodal/eroaremodal.page';
import { InputrepervalueComponent } from '../inputrepervalue/inputrepervalue.component';


@Component({
  selector: 'app-iesiri',
  templateUrl: './iesiri.page.html',
  styleUrls: ['./iesiri.page.scss'],
})
export class IesiriPage implements OnInit {

constructor(private dataService: DataService,
      private router: Router,
      private authService: AuthService,
      private firestore: AngularFirestore ,
      private fs: AngularfirestoreService,
      private alertController: AlertController,
      private modalController: ModalController) { }

      sterge(item: Article) {
        this.dataService.removeArticleByName(item)};

icons$: Observable<any> | undefined;

icons = [];
items : Article[] | undefined = [];
user: any;
userData$: Observable<any> | undefined;
puncdelucru: any;


ngOnInit() {
  console.log(this.dataService.documentNumber);
  this.items = this.dataService.selectedArticles
  this.icons$ = this.fs.getRepere();
  console.log(this.icons$)
}


onBackClicked() {
  this.dataService.clearAll();
  console.log('okok');
}


async openInputDialog(buttonName: string) {
const modal = await this.modalController.create({
component: InputrepervalueComponent,
cssClass: 'custom-modal',
componentProps: {
buttonName,
},
});

modal.onDidDismiss().then((result) => {
const data = result.data; // Obțineți obiectul cu cele două valori


const cantitate = data.cantitate; // Prima valoare
const numeArticol = data.reper; // A doua valoare
const length = data.lungime + 1;
const articol: Article = {
  cantitate: cantitate,
  numeArticol: numeArticol,
  numarCurent: length,
  unitateMasura: '',
  primite: 0,
  intrari: 0
};

this.dataService.selectedArticles?.push(articol)


// Faceți ceva cu cele două valori
console.log('Valoare 1:', cantitate);
console.log('Valoare 2:', numeArticol);
console.log('Valoare 2:', this.dataService.selectedArticles);

});

return await modal.present();

}

next(){
  this.router.navigateByUrl('/finalizare-iesiri');
}

finalizareIesiri() {
  this.authService.user$.subscribe(async (user) => {
    this.user = user;
    console.log(user.uid)

    if (user) {
      // Dacă utilizatorul este autentificat, puteți să recuperați datele din Firestore
      this.userData$ = this.firestore
        .collection('users')
        .doc(user.uid)
        .valueChanges();
    }

    if (this.userData$ !== undefined) {
      this.userData$.subscribe( async val => {
      this.puncdelucru =  val.punctdelucru;
      console.log(this.puncdelucru);
        try{

          const punctDeLucruDocRef = this.firestore.collection('punctedelucru').doc(this.puncdelucru);
          punctDeLucruDocRef.collection('consumuri').add({
              selectedArticles: this.dataService.selectedArticles,
              user: val.email,
              dataModificarii: new Date()
          }).then(() => {
            console.log('Documentul a fost inserat cu succes.');
            console.log('selected',this.dataService.selectedArticles);

            // După ce documentul a fost inserat cu succes, actualizați stocul
            // Utilizați același cod de actualizare a stocului precum în răspunsul anterior

            // Parcurgeți fiecare obiect din array-ul de articole și actualizați stocul
          })
          .catch((error) => {
            console.error('Eroare la inserarea documentului:', error);
          });


          const jurnaleRef = this.firestore.collection('punctedelucru/Electroputere/jurnale');
          const date = new Date(); // Obține data curentă
          const dataString = date.toISOString().split('T')[0];
          // const dataCurenta = new Date();
          // const dataString = dataCurenta.toISOString(); // Transformă data într-un string ISO

          for (const articol of this.dataService.selectedArticles || []) {
            const numeArticol = articol.numeArticol;
            const cantitateArticol = articol.cantitate;

            try {
              // Obține documentul curent din jurnale (dacă există)
              const docRef = jurnaleRef.doc(dataString);
              const doc = await docRef.get().toPromise();

              let jurnalData: any = {};

              if (doc?.exists) {
                jurnalData = doc.data();
              }

              // Actualizează sau creează intrarea pentru articol
              jurnalData[numeArticol] = {
          //       intrari: (jurnalData[numeArticol]?.intrari || 0) + cantitateArticol,
          //       primite: (jurnalData[numeArticol]?.primite || 0) + cantitateArticol,
                  consumate:  (jurnalData[numeArticol]?.consumate || 0) + cantitateArticol,
                  ramase:  jurnalData[numeArticol]?.primite - ((jurnalData[numeArticol]?.consumate || 0) + cantitateArticol),
              };

          //     // Salvează datele actualizate în Firestore
              await docRef.set(jurnalData,{merge: true});
              console.log(`Articolul "${numeArticol}" a fost adăugat/actualizat cu succes.`);
            } catch (error) {
              console.error(`Eroare la adăugarea/actualizarea articolului "${numeArticol}":`, error);
            }
          }

          this.dataService.selectedArticles?.forEach( (article) => {
            const { numeArticol, cantitate } = article;
            console.log('articolul',article);

            // try {
            //   // Obțineți o referință către colecția "repere"
            //   const repereRef = this.firestore.collection('punctedelucru').doc(this.puncdelucru).collection('repere');

            //   const jurnalRef = this.firestore.collection('punctedelucru').doc(this.puncdelucru).collection('jurnal');


            //   // Obțineți toate documentele din colecție
            //   repereRef.get().subscribe((snapshot) => {
            //     snapshot.forEach((doc) => {
            //       const reperData = doc.data();
            //       // Verificați dacă documentul conține cheia pe care o căutați
            //       if (reperData['nume'] === numeArticol) {
            //         const stocCurent = reperData?.['stoc'] || 0;
            //         const nouStoc = stocCurent + cantitate;

            //         // Actualizați stocul în document
            //         repereRef.doc(doc.id).update({ stoc: nouStoc }).then(() => {
            //           console.log(`Stocul pentru articolul "${numeArticol}" a fost actualizat cu succes.`);
            //         }).catch((error) => {
            //           console.error(`Eroare la actualizarea stocului pentru articolul "${numeArticol}":`, error);
            //         });
            //       }
            //     });
            //   });
            // } catch (error) {
            //   console.error(`Eroare la actualizarea stocului pentru articolul "${numeArticol}":`, error);
            // }
          });

          const alert = await this.alertController.create({
            header: 'Succes!',
            message: 'ok',
            buttons: ['OK'],
          });

          await alert.present();
          this.dataService.clearAll();
          this.router.navigateByUrl('/');
        }

      catch{
        const modal = await this.modalController.create({
          component: EroaremodalPage, // Componenta pentru afișarea erorii și opțiunea de reîncercare
          componentProps: {
            mesajEroare: 'nu e bine', // Trimiteți mesajul de eroare la modal
          },
        });
        await modal.present();

      }
      });
    }

  });

}

  }


