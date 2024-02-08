import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ModalController } from '@ionic/angular';
import { InputValoareCardComponent } from '../input-valoare-card/input-valoare-card.component';
import { AuthService } from '../auth.service';
import { FirestoreserviceService } from '../firestoreservice.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-vanzari',
  templateUrl: './vanzari.page.html',
  styleUrls: ['./vanzari.page.scss'],
})


export class VanzariPage implements OnInit {

salveazaValori() {
        console.log(this.valoareCARD, this.pctdelucru, this.date);
        const idSpecific = 'ID-Dorit'
        const dataNow = new Date().toISOString().split('T')[0];

        const dataDeAdaugat = {
          valoareCARD: this.valoareCARD,
          valoareCASH: this.valoareCASH,
          data: dataNow
          // Alte câmpuri dacă este cazul
        };
        const dateObject = new Date(this.date);
        const dataString = dateObject.toISOString().split('T')[0];
        this.firestore.collection(`punctedelucru/${this.pctdelucru.nume}/vanzari/`)
                .doc(dataString).set(dataDeAdaugat);

      };

onDateChange() {
    this.dirty = false;
    this.introdu = false;
    console.log(this.date);
    const dateObject = new Date(this.date);
    const dataString = dateObject.toISOString().split('T')[0];
    this.calculeazaValoareaVanduta(this.repere, dateObject).then(a => console.log('valor', this.rezultate = a))
    this.getCardCashOnDate(dataString);
    console.log("val card:", this.valoareCARD,"val CASH:", this.valoareCASH, "dirty:",this.dirty)
    console.log(this.valoareCARD !== undefined && this.valoareCASH !== undefined && this.dirty)
    console.log( this.valoareCASH === undefined)
}

    getCardCashOnDate(dataString: string){
      const caleDocument = `/punctedelucru/${this.pctdelucru.nume}/vanzari/${dataString}`;
      this.firestore.doc(caleDocument).get().subscribe((doc :any) => {
        if (doc?.exists) {
          // Accesați valorile aflate la cheile respective
          this.valoareCARD = doc.data()?.valoareCARD;
          this.valoareCASH = doc.data()?.valoareCASH;
          console.log('**********************valoare CARD',this.valoareCARD);
          console.log('**********************valoare CASH',this.valoareCASH);

          console.log('&&&&&&', this.totalValoareVanduta())
          this.introdu = false;
        } else {
          this.valoareCARD = undefined;
          this.valoareCASH = undefined;
          console.log('Documentul nu există.');
          console.log('cum e butonul introducre', this.introdu)
          // this.introdu = true;
        }
      });

     }


  actiuneTotal() {
    throw new Error('Method not implemented.');
  }

    rezultate: any[] = []
    vanzariDinFirebase: any[] = [];

    totalPahareMari: any;
    totalPahareMici: any;
    valoareCARD: number | undefined = 0;
    valoareCASH: number | undefined= 0;

    dataString: string | undefined;
    user: any;
    repere = ['pahar mic','pahar mare'];
    totalVandut: number;
    details:any;
    pctdelucru: any ;
    date: any;
    dirty: boolean = false ;
    introdu: boolean = false;
    segment = 'stocuri'; //

    endDate: any;
    startDate: any;
    isActive: boolean = false;
    valoareVandut: number =0;
    mesaj: string = '';
    totalCASH: number = 0;
    totalCARD: number = 0;
    totalSum: number = 0;

    pahareMici: number = 0;
    pahareMari: number = 0;



  inputValoareCard(valoare:any) {
    // throw new Error('Method not implemented.');
    console.log('valoare',valoare);
    const suma = this.rezultate.reduce((acc, curr) => acc + curr.valoareVanduta, 0);
    console.log('suma', suma);
    this.openInputValoareCardDialog(suma);
  }

  async openInputValoareCardDialog(suma: any) {
    const modal = await this.modalController.create({
      component: InputValoareCardComponent,
      componentProps: {
        suma,
      },
    });

    modal.onDidDismiss().then((result) => {
      const data = result.data; // Obțineți obiectul cu cele două valori
      const valoare= data.value; // Prima valoare
        // Faceți ceva cu cele două valori
        console.log('Valoare 1:', valoare);
        console.log('Valoare 2:', data.suma);
        const a = this.rezultate;
        this.valoareCARD = valoare;
        this.valoareCASH = data.suma - valoare;
        this.dirty = true
    });

    return await modal.present();

   }

  constructor(private dataService: DataService,
    private router: Router,
     private fs: FirestoreserviceService,
      private modalController: ModalController,
      private auth: AuthService,
      private firestore: AngularFirestore
      ) {
        this.totalVandut = this.totalValoareVanduta();
        const now = new Date();
        const pastWeek = new Date();
        pastWeek.setDate(now.getDate() - 7);

        this.endDate = now.toISOString();
        this.startDate = pastWeek.toISOString();

        this.isActive = this.endDate > this.startDate;
       }

  ngOnInit() {
    if (this.router?.getCurrentNavigation()?.extras.state) {
      this.pctdelucru = this.router.getCurrentNavigation()?.extras?.state?.['myObject'];
      console.log('detail',this.pctdelucru);
  }

  }


  ionViewWillEnter(){

    this.user = this.dataService.userData;
    this.date = new Date();
    console.log(this.date)
    this.dataString = this.date.toISOString().split('T')[0];

    // if(this.dataString !== undefined){
    //   console.log('user',this.user);
    //   this.fs.obțineArrayDinColecție(this.pctdelucru.nume,this.dataString).subscribe((ret : any) =>
    //     { this.vanzariDinFirebase  = ret.vanzari ;
    //       console.log('rezultatele din FB',this.vanzariDinFirebase);
    //     }
    //     );
    // }

    // console.log('consum',this.fs.getConsumuri2('unt','Electroputere'));
    this.calculeazaValoareaVanduta(this.repere, this.date).then(a => {this.rezultate = a; this.valoareVandut = this.totalValoareVanduta()});

    const dateObject = new Date(this.date);
    const dataString = dateObject.toISOString().split('T')[0];
    this.getCardCashOnDate(dataString);
    // console.log('&&&&&&&&&&$$$$$$$$$$',this.valoareCASH, this.valoareCARD, this.totalValoareVanduta())
    // console.log('valoare vanduta',this.totalValoareVanduta())
    // this.exempluUtilizare();
  }


   adaugaValoareLaCARD(array: any[], numeReper: any, valoareDeAdaugat: any) {
    console.log('numereper',numeReper);
    if (array === undefined) {
      array = [];
      console.log(array)
    }else{
      const obiectGasit = array.find(item => item.numeReper === numeReper);

    // Verificați dacă obiectul a fost găsit
    if (obiectGasit) {
      // Adăugați valoarea la cheia "CARD" a obiectului
      obiectGasit.CARD =  valoareDeAdaugat;
      obiectGasit.CASH = obiectGasit.valoareVanduta - valoareDeAdaugat
    }

    else return;
    }
    // Căutați obiectul cu numele specificat în array

    console.log(array);
    return array;
  }



   async calculeazaValoareaVanduta(reprezentariRepre: string[] ,date: Date): Promise<any[]> {
    const rezultate = [];

    for (const numeReper of reprezentariRepre) {
      const valoarePret =  await this.fs.getValoarePret1(this.pctdelucru.nume, numeReper)
      const numarBucatiVandute =  await this.fs.getConsumuri( numeReper,this.pctdelucru.nume, date);

      console.log('Valoarea prețului:', valoarePret);
      console.log('Număr bucăți vândute:', numarBucatiVandute);

      if( numarBucatiVandute !== 0 &&   this.valoareCASH === undefined){
        this.introdu = true;

      }
      console.log( 'conditie pentru  butonl introducere:',numarBucatiVandute !== 0 &&   this.valoareCASH === undefined)
      if (valoarePret !== undefined && numarBucatiVandute !== undefined) {

        // Calculați valoarea vândută doar dacă ambele valori sunt definite
        const valoareVanduta = valoarePret * numarBucatiVandute;
        console.log('iii')

        rezultate.push({
          numeReper,
          valoareVanduta,
          numarBucatiVandute
        });
      } else {
        // Gestionare caz în care valoarePret sau numarBucatiVandute sunt undefined
        console.error(`ValoarePret sau NumarBucatiVandute este undefined pentru ${numeReper}`);
      }
    }
    const sumaTotala = rezultate.reduce((suma, item) => {
      return suma + item.valoareVanduta;
    }, 0);
    const suma = (this.valoareCASH ?? 0) + (this.valoareCARD ?? 0);
    console.log(this.valoareCARD, this.valoareCASH, suma, sumaTotala);
    if (suma !== sumaTotala && (this.valoareCARD !== undefined)){
      this.introdu = true
      this.mesaj  = "!!!!!Atentie , s a valorile trebuie updatate!!!!! "
    }else{
      this.mesaj = '';
    }
    console.log( suma !== sumaTotala, 'rezlutate',rezultate)
    return rezultate;
  }


  totalValoareVanduta(): number {
    this.valoareVandut =  this.rezultate.reduce((acc, curr) => acc + curr.valoareVanduta, 0);
    return this.rezultate.reduce((acc, curr) => acc + curr.valoareVanduta, 0);
  }

  onBackClicked() {
    this.dataService.clearAll();
    console.log('okok');
  }


  onDateStartChange() {
    this.mesaj  = " ";
    this.isActive = this.endDate > this.startDate;
    console.log(this.isActive);
   }

  onDateEndChange() {
    this.mesaj = '';
    this.isActive = this.endDate > this.startDate;
    console.log(this.isActive);
  }
  afiseazaSituatie(){
    console.log(this.endDate, this.startDate);
    this.calculateSum();
    this.getTotalCups( this.startDate,this.endDate)
    .then(totals => {
      console.log(`Total pahare mici: ${totals.smallCups}, Total pahare mari: ${totals.largeCups}`);
    })
    .catch(error => {
      console.error('Eroare la obținerea totalului de pahare', error);
    });
  }

  async getTotalCups(startDate: Date, endDate: Date) {
    console.log('endDateee%%%%%%', new Date(endDate))
    const snapshot =
      await this.firestore
      .collection(`/punctedelucru/${this.pctdelucru.nume}/consumuri`)
      .ref
      .where('dataModificarii', '>=', new Date(startDate))
      .where('dataModificarii', '<=', new Date(endDate))
      .get();

      let smallCups = 0;
      let largeCups = 0;

      snapshot.forEach(doc => {
        const data: any = doc.data();
        if (data.selectedArticles && Array.isArray(data.selectedArticles)) {
          data.selectedArticles.forEach((article: any) => {
            if (article.numeArticol === 'pahar mic') {
              smallCups += article.cantitate;
            } else if (article.numeArticol === 'pahar mare') {
              largeCups += article.cantitate;
            }
          });
        }
      });
      this.pahareMici = smallCups;
      this.pahareMari = largeCups;
      return { smallCups, largeCups };


  }

  async  calculateSum() {

    console.log('startdate', new Date(this.startDate).toISOString().split('T')[0], 'endData', new Date(this.endDate).toISOString().split('T')[0])
    let totalCARD = 0;
    let totalCASH = 0;

    // Interogarea Firestore
    const snapshot = await this.firestore
      .collection(`/punctedelucru/${this.pctdelucru.nume}/vanzari`)
      .ref
      .where('data', '>=', new Date(this.startDate).toISOString().split('T')[0])
      .where('data', '<=', new Date(this.endDate).toISOString().split('T')[0])
      .get();

    // Calculul sumei
    snapshot.forEach((doc:any) => {
      const data = doc.data();
      console.log(data);
      this.totalCASH += data.valoareCASH || 0;
      this.totalCARD += data.valoareCARD || 0;
    });

    this.totalSum = this.totalCASH + this.totalCARD;
    console.log(`Total Cash: ${this.totalCASH}, Total Card: ${this.totalCARD}, Total Sum: ${this.totalSum}`);
    return this.totalSum;
  }

  // Exemplu de utilizare a funcției





}
