import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Article } from '../article.interface';
import { EroaremodalPage } from '../eroaremodal/eroaremodal.page';
import { AngularfirestoreService } from '../angularfirestore.service';
import { FirestoreserviceService } from '../firestoreservice.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InputrepervalueComponent } from '../inputrepervalue/inputrepervalue.component';
import { DocumentData, DocumentReference, getDoc, increment } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { runTransaction, getFirestore, doc } from 'firebase/firestore';
import { AuthService } from '../auth.service';

interface FirestoreProductData {
  cantitate: number;
  // ... alte proprietăți
}

@Component({
  selector: 'app-gridarticole',
  templateUrl: './gridarticolepctdelucru.page.html',
  styleUrls: ['./gridarticolepctdelucru.page.scss'],
})

export class GridarticolepctdelucruPage implements OnInit {

  constructor(private dataService: DataService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private firestore: AngularFirestore ,
    private fs: AngularfirestoreService,
    private modalController: ModalController) { }

  icons$: Observable<any> | undefined;
  user: any;
  icons: any[] = [];
  items : Article[] | undefined = [];
  userData$: Observable<any> | undefined;
  pctdelucru: any;



ngOnInit() {
    console.log(this.dataService.documentNumber);
    this.icons$ = this.fs.getRepere();
    console.log(this.icons$)
    this.items = this.dataService.selectedArticles

    if (this.router?.getCurrentNavigation()?.extras.state) {
      this.pctdelucru = this.router.getCurrentNavigation()?.extras?.state?.['myObject'];
      console.log('pctdelucru',this.pctdelucru);
     }

}


async openInputDialog(buttonName: string) {
    const modal = await this.modalController.create({
    component: InputrepervalueComponent,
    componentProps: {
    buttonName,
    },
});

modal.onDidDismiss().then((result) => {
const data = result.data; // Obțineți obiectul cu cele două valori


const cantitate = data.cantitate; // Prima valoare
const numeArticol = data.reper; // A doua valoare
const length = data.lungime +1;
const articol: Article = {
      cantitate: cantitate,
      numeArticol: numeArticol,
      numarCurent: length,
      unitateMasura: '',
      primite: 0,
      intrari: 0
};

// this.dataService.selectedArticles?.push(articol)
this.dataService.addOrUpdateArticle(articol);


// Faceți ceva cu cele două valori
console.log('Valoare 1:', cantitate);
console.log('Valoare 2:', numeArticol);
console.log('Valoare 2:', this.dataService.selectedArticles);

});

return await modal.present();

}

next(){
  this.router.navigateByUrl('/finalizare');
}

async finalizare(){

  this.authService.user$.subscribe(async (user) => {
    this.user = user;
    console.log(user.uid)



      console.log('ok');
      const documentNumber = this.dataService.documentNumber;
      const documentSerie = this.dataService.documentSerie || ""; // Aici atribuiți o valoare implicită (un șir gol) dacă documentSerie este undefined
      const document =   documentSerie + documentNumber;
      console.log(this.pctdelucru.nume);

        try{

        const punctDeLucruDocRef = this.firestore.collection('punctedelucru').doc(this.pctdelucru.nume);

        punctDeLucruDocRef.collection('intrari').add({
          documentSerie: this.dataService.documentSerie,
          documentNumber: this.dataService.documentNumber,
          selectedArticles: this.dataService.selectedArticles,
          // user: this.user.email,
          dataModificarii: new Date(),
          dataIntrarii: new Date().toISOString().split('T')[0]
          // punctdelucru: this.pctdelucru.nume
        })
        .then((pctRef) => {
          console.log('am adaugat aviz')
          pctRef.update({ documentId: pctRef.id });
        })
        .catch((error) => {
          console.error('Eroare în timpul adăugării în Firestore:', error);
        });

          const jurnaleRef = this.firestore.collection(`punctedelucru/${this.pctdelucru.nume}/jurnale`);
          const jurnaleDCRef = this.firestore.collection(`stoc-ziua`);
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
              const docDCRef = jurnaleDCRef.doc(dataString)
              const doc = await docRef.get().toPromise();
              const docDC = await docDCRef.get().toPromise();

              let jurnalData: any = {};
              let jurnalDCData: any = {};

              if (doc?.exists) {
                jurnalData = doc.data();
              }
              if (docDC?.exists) {
                jurnalDCData = docDC.data();
                console.log('juranalDC...',jurnalDCData);
              }

              // Actualizează sau creează intrarea pentru articol
              jurnalData[numeArticol] = {
                intrari: (jurnalData[numeArticol]?.intrari || 0) + cantitateArticol,
                ramase:  (jurnalData[numeArticol]?.intrari || 0) + (jurnalData[numeArticol]?.primite || 0) - (jurnalData[numeArticol]?.consumate || 0) + cantitateArticol,
                // primite: (jurnalData[numeArticol]?.primite || 0) ,
              };
              jurnalDCData[numeArticol] = {
                consumate: (jurnalDCData[numeArticol]?.consumate || 0) + cantitateArticol,
                ramase:  (jurnalDCData[numeArticol]?.intrari || 0) + (jurnalDCData[numeArticol]?.primite || 0) - (jurnalDCData[numeArticol]?.consumate || 0) - cantitateArticol,
                // primite: (jurnalData[numeArticol]?.primite || 0) ,
              };


              // Salvează datele actualizate în Firestore
              await docRef.set(jurnalData,{merge: true});
              await docDCRef.set(jurnalDCData,{merge: true});
              const stocRef = this.firestore.collection(`/punctedelucru/${this.pctdelucru}/stocuri`).doc(numeArticol);
              await stocRef.set({ cantitate: jurnalData[numeArticol].ramase }, { merge: true });

              console.log(`Articolul "${numeArticol}" a fost adăugat/actualizat cu succes.`);
            } catch (error) {
              console.error(`Eroare la adăugarea/actualizarea articolului "${numeArticol}":`, error);
            }
          }

          this.dataService.selectedArticles?.forEach( (article) => {
            const { numeArticol, cantitate } = article;
            console.log('articolul',article);

            try {
              // Obțineți o referință către colecția "repere"
              const repereRef = this.firestore.collection('punctedelucru').doc(this.pctdelucru.nume).collection('repere');
              const stocuriRef = this.firestore.collection('punctedelucru').doc(this.pctdelucru.nume).collection('stocuri');

              const stocDocumentRef = this.firestore.doc(`stoc-ziua/${dataString}}`);

              // Obțineți toate documentele din colecție
              stocuriRef.get().subscribe((snapshot) => {
                snapshot.forEach((doc) => {
                  const reperData = doc.data();
                  // Verificați dacă documentul conține cheia pe care o căutați
                  if (reperData['nume'] === numeArticol) {
                    const stocCurent = reperData?.['cantitate'] || 0;
                    const nouStoc = stocCurent + cantitate;

                    // Actualizați stocul în document
                    stocuriRef.doc(doc.id).update({ cantitate: nouStoc }).then(() => {
                      console.log(`Stocul pentru articolul "${numeArticol}" a fost actualizat cu succes.`);
                    }).catch((error) => {
                      console.error(`Eroare la actualizarea stocului pentru articolul "${numeArticol}":`, error);
                    });
                  }
                });
              });
            } catch (error) {
              console.error(`Eroare la actualizarea stocului pentru articolul "${numeArticol}":`, error);
            }
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


onBackClicked() {
  this.dataService.clearAll();
  console.log('okok');
}


sterge(item: Article) {
  this.dataService.removeArticleByName(item)}


// async addInvoiceAndUpdateStock(invoiceData: any) {
//       const firestoreBatch = this.firestore.firestore.batch();

//       // Adaugă noua factură
//       const invoiceRef = this.firestore.collection('facturi').doc().ref;
//       firestoreBatch.set(invoiceRef, invoiceData);

//       // Actualizează stocul pentru fiecare produs din factură
//       invoiceData.selectedArticles.forEach((product: any) => {
//         const productRef = this.firestore.doc(`stoc/${product.numeArticol}`).ref;

//         firestoreBatch.update(productRef, {
//           cantitate: this.firestore.firestore.FieldValue.increment(product.cantitate)
//         });
//       });

//       // Execută operațiunile în batch
//       await firestoreBatch.commit();
//     }

// async addInvoiceAndUpdateStock(invoiceData: any) {
//   const db = this.firestore.firestore;

//   const batch = db.batch();

//   // Adaugă noua factură
//   const invoiceRef = this.firestore.collection('facturi').doc().ref;
//   batch.set(invoiceRef, invoiceData);

//   // Actualizează stocul pentru fiecare produs din factură
//   await Promise.all(invoiceData.selectedArticles.map(async (product: any) => {
//       const productRef = this.firestore.collection('stoc').doc(product.numeArticol).ref;

//       await db.runTransaction(async (transaction) => {
//           const productDoc = await transaction.get(productRef);
//           if (!productDoc.exists) {
//               throw new Error("Document does not exist!");
//           }
//           const productData = productDoc.data() as FirestoreProductData;
//           let cantitateActuala = productData.cantitate || 0;
//           cantitateActuala += product.cantitate;

//           // let cantitateActuala = productDoc.data()?.cantitate || 0;
//           // cantitateActuala += product.cantitate;

//           transaction.update(productRef, { cantitate: cantitateActuala });
//       });
//   }));

//   await batch.commit();

//   console.log("Transaction successfully committed!");
// }

async addDeliveryNoteAndUpdateStock(deliveryNoteData: any, numePunctDeLucru: string) {
  const db = this.firestore.firestore;
  console.log(this.pctdelucru);

  return db.runTransaction(async (transaction) => {
    // Actualizează stocul pentru fiecare produs din aviz
    const productRefsAndData = await Promise.all(
      deliveryNoteData.selectedArticles.map(async (product: any) => {
        const productRef = this.firestore.doc(`stoc/${product.numeArticol}`).ref;
        const productDoc = await transaction.get(productRef);

        if (!productDoc.exists) {
          throw new Error('Document does not exist!');
        }

        return { ref: productRef, data: productDoc.data(), newData: product.cantitate };
      })
    );

    // Adaugă noul aviz la locația specificată
    const deliveryNoteRef = this.firestore.collection(`punctedelucru/${numePunctDeLucru}/intrari`).doc().ref;
    const deliveryNoteId = deliveryNoteRef.id;
    console.log("deliveryid",deliveryNoteId);

    deliveryNoteData.documentId = deliveryNoteId;

    transaction.set(deliveryNoteRef, deliveryNoteData);

    // Procesează și aplică actualizările de stoc
    productRefsAndData.forEach(({ ref, data, newData }) => {
      console.log(data?.cantitate);
      const existingQuantity = data?.cantitate || 0;
      const newQuantity = existingQuantity + newData; // Aici poate fi necesar să ajustezi numele câmpului și logica în funcție de structura ta de date
      console.log('newQuantity', newQuantity);
      transaction.update(ref, { cantitate: newQuantity });
    });
  });
}


async addInvoiceAndUpdateStock(invoiceData: any) {
  const db = this.firestore.firestore;

  return db.runTransaction(async (transaction) => {
    // Actualizează stocul pentru fiecare produs din factură
    const productRefsAndData = await Promise.all(
      invoiceData.selectedArticles.map(async (product: any) => {
        const productRef = this.firestore.doc(`stoc/${product.numeArticol}`).ref;
        const productDoc = await transaction.get(productRef);

        if (!productDoc.exists) {
          throw new Error('Document does not exist!');
        }

        return { ref: productRef, data: productDoc.data(), newData: product.cantitate };
      })
    );

    // Adaugă noua factură
    const invoiceRef = this.firestore.collection('facturi').doc().ref;
    const invoiceId = invoiceRef.id;
    invoiceData.documentId = invoiceId;

    transaction.set(invoiceRef, invoiceData);

    // Procesează și aplică actualizările de stoc
    productRefsAndData.forEach(({ ref, data, newData }) => {
      console.log(data?.cantitate);
      const existingQuantity = data?.cantitate || 0;
      const newQuantity = existingQuantity + newData; // Aici poate fi necesar să ajustezi numele câmpului și logica în funcție de structura ta de date

      transaction.update(ref, { cantitate: newQuantity });
    });
  });
}


}





