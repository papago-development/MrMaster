import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocuri',
  templateUrl: './stocuri.page.html',
  styleUrls: ['./stocuri.page.scss'],
})
export class StocuriPage implements OnInit {
  articles: any[] = [];
  details: any;
  dataString: string | undefined;
  items:any;
  selectedD: string | undefined;
  order:any;

  constructor(private firestore: AngularFirestore,
              private dataService: DataService,
              private router: Router) {

              }

  ngOnInit() {
    const date = new Date();
    console.log(date)
    this.dataString = date.toISOString().split('T')[0];
    const jurnaleRef = this.firestore.collection(`stoc-ziua`).doc(this.dataString);
    jurnaleRef.get().subscribe((doc: any) => {
      if (doc.exists) {
        // Documentul există
        const data : any= doc.data();

        this.items = doc.data();
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

        console.log('acesta e stocul',this.items) // Obțineți datele documentului
      } else {
        // Documentul nu există
        console.log('Documentul nu există pentru data curentă:', this.dataString);
      }
    });


  }



  onDateChange() {
    this.queryFirestoreWithSelectedDate();
  }

  onBackClicked() {
    this.dataService.clearAll();
    console.log('okok');
  }

  queryFirestoreWithSelectedDate() {
    // Utilizați selectedDate pentru a construi data pentru interogare
    const selectedDateString = this.selectedD?.split('T')[0];; // Converțiți data în format ISO

    console.log('selectedDate',selectedDateString)
    console.log(this.selectedD?.split('T')[0]);
    const jurnaleRef = this.firestore.collection(`stoc-ziua`).doc(selectedDateString);
    jurnaleRef.get().subscribe((doc: any) => {
      if (doc.exists) {
        // Documentul există
        // this.items = doc.data();
        const data : any= doc.data();
        this.order = ['pahar mic', 'pahar mare', 'porumb', 'branza', 'unt'];
        const orderedData : any = {};
        this.order.forEach((key: any) => {
          if (data[key]) {
            orderedData[key] = data[key];
          }
        });
        // Utilizează orderedData în continuare
        this.items = orderedData;

        console.log('cand am dat click',this.items) // Obțineți datele documentului
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
}
