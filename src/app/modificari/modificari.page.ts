import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { AngularfirestoreService } from '../angularfirestore.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modificari',
  templateUrl: './modificari.page.html',
  styleUrls: ['./modificari.page.scss'],
})

export class ModificariPage implements OnInit {


modifica(_t41: any) {
  console.log(_t41);
  let navigationExtras: NavigationExtras = {
    state: {
      myObject: _t41
    }
  };
  this.router.navigateByUrl('/modific-aviz',navigationExtras);
}


sterge(_t42: any) {
throw new Error('Method not implemented.');
}

afiseazaAvize() {
  console.log(this.endDate, this.startDate);
  this.loadData();
}

endDate: any;
startDate: any;
endDateView: any;
startDateView: any;

isActive: boolean = false;

data: any[] = [];
itemsPerPage = 10; // Numărul de elemente pe pagină
currentPage = 1; // Pagina curentă
pagedData: any[] = [];
pctdelucru: any ;
searchTerm: string = '';
filteredItems: any[] = [];
originalData: any[] = [];

  constructor( private firestore: AngularFirestore ,
    private router: Router,
    private dataService: DataService,
    private fs: AngularfirestoreService) {
    const now = new Date();
    const pastWeek = new Date();
    pastWeek.setDate(now.getDate() - 7);



    this.endDate = now.toISOString();
    this.startDate = pastWeek.toISOString();

    this.startDateView = this.startDate.split('T')[0];
    this.endDateView = this.endDate.split('T')[0];

    this.isActive = this.endDate > this.startDate;

   }
   searchItems() {
    // this.data = this.data.filter((item) =>
    //   item.documentNumber.includes(this.searchTerm)
    // );
    if (this.searchTerm) {
      this.data = this.originalData.filter((item) =>
        item.documentNumber.includes(this.searchTerm)
      );
    } else {
      // Dacă searchTerm este gol, resetează `data` la setul complet de date
      this.data = [...this.originalData];
    }
  }

  onDateStartChange() {
    this.isActive = this.endDate > this.startDate;
    this.startDateView = this.startDate.split('T')[0];
    this.endDateView = this.endDate.split('T')[0];
    console.log(this.isActive);
   }

  onDateEndChange() {
    this.isActive = this.endDate > this.startDate;
    this.startDateView = this.startDate.split('T')[0];
    this.endDateView = this.endDate.split('T')[0];
    console.log(this.isActive);
  }

  ngOnInit() {
    if (this.router?.getCurrentNavigation()?.extras.state) {
      this.pctdelucru = this.router.getCurrentNavigation()?.extras?.state?.['myObject'];
      console.log('detail',this.pctdelucru);
  }
    this.loadData();
    // this.updatePageData();
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.updatePageData();
  }


  updatePageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // this.pagedData = this.data.slice(startIndex, endIndex);
  }


  async loadData() {
    // Utilizează Firestore pentru a încărca datele bazate pe range-ul de date
    const snapshot = await this.firestore
      .collection('punctedelucru')
      .doc(this.pctdelucru.nume)  // Înlocuiește cu id-ul corespunzător
      .collection('intrari').
      ref
      .where('dataModificarii', '>=', new Date(this.startDate))
      .where('dataModificarii', '<=', new Date(this.endDate))
      .get();

      this.data = snapshot.docs.map(doc => {

        const docData: any = doc.data();
        console.log('########',docData['dataModificarii']);
        const dateObject = new Date(docData['dataModificarii'].seconds * 1000);


        // Formatarea datei în formatul dd-mm-yyyy
        const day = dateObject.getDate().toString().padStart(2, '0'); console.log(day)
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Lunile încep de la 0, deci adăugăm 1
        const year = dateObject.getFullYear();
        // const [an, luna, zi] = docData['dataModificarii'].split("-");
        docData['dataIntrariiView'] = `${day}-${month}-${year}`;
        // docData['dataModificariiView'] = `${day}-${month}-${year}`;

        // if (docData['dataModificarii'] && docData['dataModificarii'].seconds) {
        //   const dateObject = new Date(docData['dataModificarii'].seconds * 1000);
        //   docData['dataModificarii'] = dateObject.toISOString().split('T')[0];
        // }


        // if (docData['dataModificarii'] && docData['dataModificarii'].seconds) {
        //   const dateObject = new Date(docData['dataModificarii'].seconds * 1000);
        //   docData['dataModificarii'] = dateObject.toISOString().split('T')[0];
        // }


        return docData;
      });
      this.originalData = [...this.data]

    console.log('datelemele',this.data)
    this.updatePageData();
  }


  onBackClicked() {
    this.dataService.clearAll();
    console.log('okok');
  }

}
