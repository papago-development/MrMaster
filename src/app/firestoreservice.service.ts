import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



import { Observable, first, map } from 'rxjs';
import { NumericValueAccessor } from '@ionic/angular';
import { AuthService } from './auth.service';
import { Article } from './article.interface';

@Injectable({
  providedIn: 'root'
})


export class FirestoreserviceService {

  constructor(private firestore: AngularFirestore, private auth : AuthService) { }

  getRepere(){
    // return this.firestore.collection('repere').valueChanges<Icon[]>());
    return this.firestore.collection('repere').valueChanges();

  }

  async getValoarePret1(numepunctdelucru: string, numereper: string): Promise<number | undefined> {
    try {
      // Construim calea către documentul din Firestore
      const docPath = `punctedelucru/${numepunctdelucru}/repere/${numereper}`;
      console.log(docPath);

      // Obținem documentul și extragem valoarea proprietății "pret"
      const document = await this.firestore.doc<any>(docPath).valueChanges().pipe(first()).toPromise();
      const pret = document?.pret;

      return pret;
    } catch (error) {
      console.error("Eroare în getValoarePret:", error);
      return undefined; // Tratați eroarea corespunzător
    }
  }

  async getValoarePret(numepunctdelucru: string, numereper: string){
    // Construim calea către documentul din Firestore
    const docPath = `punctedelucru/${numepunctdelucru}/repere/${numereper}`;
    console.log(docPath)

    // Obținem documentul și extragem valoarea proprietății "pret"
    this.firestore.doc<any>(docPath).valueChanges().pipe(map(document => document?.pret)).subscribe((pret) => {return pret});
  }




  async adaugaArrayLaColecție(punctLucruId: string, dataISO: string, arrayDeIntrodus: any[]) {
    const colectieRef = this.firestore.collection(`/punctedelucru/${punctLucruId}/vanzari`);

    try {
      await colectieRef.doc(dataISO).set({ vanzari: arrayDeIntrodus });
      console.log('Array-ul a fost adăugat cu succes în colecție.');
    } catch (error) {
      console.error('Eroare la adăugarea array-ului în colecție:', error);
    }
  }

  obțineArrayDinColecție(punctLucruId: string, dataISO: string){
    const docRef = this.firestore.doc(`/punctedelucru/${punctLucruId}/vanzari/${dataISO}`);
    return docRef.snapshotChanges().pipe(
      map((docSnapshot) => {
        if (docSnapshot.payload.exists) {
          const data = docSnapshot.payload.data();
          // Faceți orice transformări necesare în data aici
          return data;
        } else {
          return null; // Documentul nu există sau este gol
        }
      })
    );

  }


  getDocumentBySeriesAndNumber(idPunctLucru: string, serie: string, number: number) {
    return this.firestore
      .collection('punctedelucru').doc(idPunctLucru)
      .collection('intrari', ref => ref.where('documentSerie', '==', serie).where('documentNumber', '==', number))
      .valueChanges();
  }

  getUmByButtonName(buttonName: string): Observable<any> {
    return this.firestore.collection('repere', ref => ref.where('nume', '==', buttonName)).valueChanges();
  }

  async  getConsumuri(reper: any, punctdelucru: string ,date: Date): Promise<number> {
    const docPath = `punctedelucru/${punctdelucru}/jurnale/`;
    // const date = new Date();
    const dataString = date.toISOString().split('T')[0];

    try {
      const jurnalData: any = await this.firestore
        .collection(docPath)
        .doc(dataString)
        .valueChanges()
        .pipe(first()) // Utilizăm first() pentru a obține doar prima valoare
        .toPromise();

      if (jurnalData && jurnalData[reper] && jurnalData[reper]['consumate']) {
        console.log(jurnalData[reper]['consumate']);
        return jurnalData[reper]['consumate'];
      } else {
        return 0; // Sau o altă valoare implicită când nu există date
      }
    } catch (error) {
      console.error('Eroare în getConsumuri:', error);
      throw error; // Tratați eroarea corespunzător sau aruncați-o mai departe
    }
  }





getConsumuri2(reper: string, punctdelucru: string){
  const docPath = `punctedelucru/${punctdelucru}/jurnale/`;
  const date = new Date();
  const dataString = date.toISOString().split('T')[0];
  console.log(docPath)

  return this.firestore
    .collection(docPath)
    .doc(dataString)
    .valueChanges()
    .pipe(
      map((jurnalData: any) => {
        if (jurnalData && jurnalData[reper] && jurnalData[reper]['consumate']) {
          console.log(jurnalData[reper]['consumate']);
          return jurnalData[reper]['consumate'];
        } else {
          console.log(jurnalData);
          return 0; // Înlocuiți cu valoarea implicită dorită când nu există date
        }
      })
    );
}
















  setStocZeroRepere(){


// ...

// Obțineți o referință la colecția pentru care doriți să actualizați toate documentele
const colectieRef = this.firestore.collection('repere');// TODO:de facut cu punctul de lucru

// Valoarea pe care doriți să o setați pentru proprietatea "stocCurent"
const stocCurentValue = 0;

// Obțineți toate documentele din colecție
colectieRef.get().subscribe((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // Obțineți referința la documentul curent
    const documentRef = colectieRef.doc(doc.id);

    // Utilizați metoda "update" pentru a actualiza "stocCurent" pentru documentul curent
    documentRef.update({ stocCurent: stocCurentValue })
      .then(() => {
        console.log(`Documentul cu id-ul ${doc.id} a fost actualizat cu succes.`);
      })
      .catch((error) => {
        console.error(`Eroare la actualizarea documentului cu id-ul ${doc.id}:`, error);
      });
  });
});

  }

  async documentNumberExists(numarDocument: string, numePunctLucru: string): Promise<boolean> {
    const intrariCollectionRef = this.firestore.collection(`punctedelucru/${numePunctLucru}/intrari`);

    try {
      const querySnapshot = await intrariCollectionRef
        .ref
        .where('documentNumber', '==', numarDocument)
        .get();

      // Dacă există documente cu același număr, atunci returnează true, altfel returnează false
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Eroare la verificarea existenței numărului de document:', error);
      throw error;
    }
  }


async adaugaSauActualizeazaArticoleInJurnal(articole: Article[]) {
  const dataCurenta = new Date();
  const dataString = dataCurenta.toISOString(); // Transformă data într-un string ISO

  for (const articol of articole) {
    let numeArticol = articol.numeArticol;
    const cantitateArticol = articol.cantitate;

    try {
      // Obține colecția de jurnale din Firestore
      const jurnaleRef = this.firestore.collection('punctedelucru/Craiova/jurnale');

      // Creează un document cu ID-ul dat de data curentă
      const docRef = jurnaleRef.doc(dataString);

      const doc = await docRef.get().toPromise();

      if (doc?.exists) {
        // Dacă documentul există, actualizează-l
        let jurnalData: any = doc.data();
        // if (!jurnalData) {
        //   jurnalData = {};
        // }

        // if (!jurnalData[numeArticol]) {
        //   jurnalData[numeArticol] = {};
        // }

        jurnalData[numeArticol] = {
          intrari: cantitateArticol,
          primite: cantitateArticol + 1,
        };
        await docRef.update(jurnalData);
      } else {
        // Dacă documentul nu există, creează-l
        const jurnalData = {
          [numeArticol]: {
            intrari: cantitateArticol,
            primite: cantitateArticol,
          },
        };
        await docRef.set(jurnalData);
      }
    } catch (error) {
      console.error(`Eroare la adăugarea/actualizarea articolului "${numeArticol}":`, error);
    }
  }
}

}
