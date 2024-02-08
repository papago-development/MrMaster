import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, switchMap } from 'rxjs';
import { formatDate } from '@angular/common';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
interface FirestoreData {
  primite: number;
  // Add other properties as needed
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'situatie.page.html',
  styleUrls: ['situatie.page.scss']
})


export class SituatiePage implements OnInit{
  selectedDate: any;
  selectedD: string;
  details: any;
  pctdelucru:any;
  segment = 'situatie'; //
  stocuri: any[] = [];
  order:any;

  constructor(private firestore: AngularFirestore,private dataService: DataService,  private router: Router) {
    this.selectedD = this.getCurrentDate();
    console.log(this.selectedD);
  }

  jurnale$: Observable<any[]> | undefined;
  items:any;
  dataString: string | undefined;



  ionViewWillEnter(){
    if (this.router?.getCurrentNavigation()?.extras.state) {
      this.details = this.router.getCurrentNavigation()?.extras?.state?.['myObject'];
      console.log('detail',this.details);
  }
    console.log('okok');
    this.selectedD = this.getCurrentDate();
    console.log('selectedD',this.selectedD);
    // Obține datele din colecția "jurnale"
    const date = new Date();
    console.log(date)
    this.dataString = date.toISOString().split('T')[0];
    console.log(this.dataString, this.pctdelucru.nume);
    const jurnaleRef = this.firestore.collection(`punctedelucru/${this.pctdelucru.nume}/jurnale`).doc(this.dataString)
    jurnaleRef.get().subscribe((doc) => {
      if (doc.exists) {
        // Documentul există
        this.items = doc.data();
        const data : any= doc.data();
        console.log('data',data)
        this.order = ['pahar mic', 'pahar mare', 'porumb', 'branza', 'unt'];
        const orderedData : any = {};
        this.order.forEach((key: any) => {
          if (data[key]) {
            orderedData[key] = data[key];
          }
        });
        // Utilizează orderedData în continuare
        this.items = orderedData;
        // for (const key in this.items) {
        //   if (this.items.hasOwnProperty(key)) {
        //     const element = this.items[key];

        //     // Verificați dacă obiectul are proprietățile "primite" și "consumate"
        //     if ("primite" in element && "consumate" in element) {
        //       // Calculați valoarea pentru "ramase"
        //       element.ramase = element.intrari + element.primite - element.consumate;
        //     }
        //   }
        // }
        // Calculați diferența dintre primite și consumate și adăugați-o ca "ramase"
        // this.items.forEach((item: { ramase: number; primite: number; consumate: number; }) => {
        //   item.ramase = item.primite - item.consumate;
        // });

        console.log(this.items) // Obțineți datele documentului
      } else {
        // Documentul nu există
        console.log('Documentul nu există pentru data curentă:', this.dataString);
      }
    });


    this.getStocuriForPunctDeLucru('idPunctDeLucru').subscribe((data) => {
      this.stocuri = data;
      console.log(this.stocuri);
    });

  }

  onDateChange() {
    this.queryFirestoreWithSelectedDate();
  }

  ngOnInit(): void {

      if (this.router?.getCurrentNavigation()?.extras.state) {
        this.pctdelucru = this.router.getCurrentNavigation()?.extras?.state?.['myObject'];
        console.log('detail',this.pctdelucru);
    }
  }

  getStocuriForPunctDeLucru(idPunctDeLucru: string): Observable<any[]> {
    // Construim calea către colecția de stocuri pentru punctul de lucru specific
    const cale = `punctedelucru/${this.pctdelucru.nume}/stocuri`;

    // Obținem referința către colecția de stocuri
    const stocuriRef = this.firestore.collection(cale);
    const caleLimite = `punctedelucru/${this.pctdelucru.nume}/limite`;

    return stocuriRef.valueChanges().pipe(
      // Combina datele stocurilor cu datele limitelor
      switchMap((stocuri) => {
        return this.firestore.collection(caleLimite).valueChanges().pipe(
          map((limite) => {
            // Pentru fiecare stoc, găsim limita corespunzătoare și o adăugăm în obiectul stoc
            return stocuri.map((stoc : any) => {
              const limita : any = limite.find((l : any) => l.nume === stoc.nume);
              return {
                ...stoc,
                limita: limita ? limita.limita : null,
              };
            });
          })
        );
      })
    );
  }

    // Folosim .valueChanges() pentru a obține datele
    // return collectionRef.valueChanges();
  // }

   queryFirestoreWithSelectedDate() {
    // Utilizați selectedDate pentru a construi data pentru interogare
    const selectedDateString = this.selectedD.split('T')[0];; // Converțiți data în format ISO

    console.log('selectedDate',selectedDateString)
    console.log(this.selectedD.split('T')[0]);
    const jurnaleRef = this.firestore.collection(`punctedelucru/${this.pctdelucru.nume}/jurnale`).doc(selectedDateString);


    jurnaleRef.get().subscribe((doc) => {
      if (doc.exists) {
        // Documentul există
        const data : any= doc.data();
        console.log('data',data)
        this.order = ['pahar mic', 'pahar mare', 'porumb', 'branza', 'unt'];
        const orderedData : any = {};
        this.order.forEach((key: any) => {
          if (data[key]) {
            orderedData[key] = data[key];
          }
        });
        // Utilizează orderedData în continuare
        this.items = orderedData;
        // for (const key in this.items) {
        //   if (this.items.hasOwnProperty(key)) {
        //     const element = this.items[key];

        //     // Verificați dacă obiectul are proprietățile "primite" și "consumate"
        //     if ("primite" in element && "consumate" in element) {
        //       // Calculați valoarea pentru "ramase"
        //       element.ramase = element.primite - element.consumate;
        //     }
        //   }
        // }
        // Calculați diferența dintre primite și consumate și adăugați-o ca "ramase"
        // this.items.forEach((item: { ramase: number; primite: number; consumate: number; }) => {
        //   item.ramase = item.primite - item.consumate;
        // });

        console.log('item',this.items) // Obțineți datele documentului
      } else {
        // Documentul nu există
        console.log('Documentul nu există pentru data curentă:', this.dataString);
        this.items = [];
      }

    });

    // Faceți interogarea către Firestore
    // Obțineți rezultatele interogării
    const snapshot =  jurnaleRef.get();

    // Procesați rezultatele snapshot-ului
    snapshot.forEach((doc) => {
      // Aici puteți face ce doriți cu documentele obținute din Firestore
      // console.log(doc.id, '=>', doc.data());
    });
 }

 getCurrentDate(): string {
  const currentDate = new Date();
  // Formatați data curentă în format "DD/MM/YYYY"
  return currentDate.toISOString();
}

onBackClicked() {
  this.dataService.clearAll();
  console.log('okok');
}
}
