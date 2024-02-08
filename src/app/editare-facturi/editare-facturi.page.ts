import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { DataService } from '../data.service';

@Component({
  selector: 'app-editare-facturi',
  templateUrl: './editare-facturi.page.html',
  styleUrls: ['./editare-facturi.page.scss'],
})
export class EditareFacturiPage implements OnInit {
  endDate: any;
  startDate: any;
  isActive: boolean = false;
  data: any[] = [];
  itemsPerPage = 10; // Numărul de elemente pe pagină
  currentPage = 1; // Pagina curentă
  pagedData: any[] =[] //



  constructor(private firestore: AngularFirestore, private router: Router, private dataService: DataService ) {

    const now = new Date();
    const pastWeek = new Date();
    pastWeek.setDate(now.getDate() - 7);

    this.endDate = now.toISOString();
    this.startDate = pastWeek.toISOString();

    this.isActive = this.endDate > this.startDate;
   }

   paginationConfig: PaginationInstance = {
    id: 'myPagination', // Specifică ID-ul aici
    itemsPerPage: 10,
    currentPage: 1
  };


   ngOnInit() {
    this.data = [];
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
    this.pagedData = this.data.slice(startIndex, endIndex);
  }




  modifica(_t41: any) {
    console.log('voi trimitela modificare',_t41);
    let navigationExtras: NavigationExtras = {
      state: {
        myObject: _t41
      }
    };

    this.router.navigateByUrl('/modific-factura',navigationExtras);
  }

  onDateStartChange() {
    this.isActive = this.endDate > this.startDate;
    console.log(this.isActive);
   }

  onDateEndChange() {
    this.isActive = this.endDate > this.startDate;
    console.log(this.isActive);
  }


  async loadData() {
    // Utilizează Firestore pentru a încărca datele bazate pe range-ul de date
    const snapshot = await this.firestore
      .collection('facturi')
      .ref
      .where('dataModificarii', '>=', new Date(this.startDate).toISOString().split('T')[0])
      .where('dataModificarii', '<=', new Date(this.endDate).toISOString().split('T')[0])
      .orderBy('dataModificarii', 'desc') // Ordonare după dataModificarii în ordine descrescătoare
      .orderBy('documentNumber','asc') // Ordonare suplimentară după documentNumber
      .get();

      this.data = snapshot.docs.map(doc => {
        const docData: any = doc.data();

        // const dateObject = new Date(docData['dataModificarii'].seconds * 1000);

        // // Formatarea datei în formatul dd-mm-yyyy
        // const day = dateObject.getDate().toString().padStart(2, '0');
        // const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Lunile încep de la 0, deci adăugăm 1
        // const year = dateObject.getFullYear();

        // docData['dataModificariiView'] = `${day}-${month}-${year}`;

        // if (docData['dataModificarii'] && docData['dataModificarii'].seconds) {
        //   const dateObject = new Date(docData['dataModificarii'].seconds * 1000);
        //   docData['dataModificarii'] = dateObject.toISOString().split('T')[0];
        // }

        return docData;
      });

    console.log('datelemede',this.data)

    this.updatePageData();
  }





  afiseazaFacturi() {
    console.log(this.endDate, this.startDate);
    this.loadData();
  }

  onBackClicked() {
    this.dataService.clearAll();
    console.log('okok');
  }



}
