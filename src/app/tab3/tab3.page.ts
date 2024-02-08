import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: any | null;
  userData$: Observable<any> | undefined;
  alerts: any[] = [];
  page = {
    size: 10, // Numărul de rânduri pe pagină
    offset: 0, // Începutul paginării
  };
  filterText: string = '';
  sortOrder: string = 'asc';
  private searchTerms = new Subject<string>();

  selectedSegment: string = 'date-logare'; // Inițial selectat pe "Date Logare"

  // Metoda pentru a schimba segmentul selectat
  changeSegment(segment: string) {
    this.selectedSegment = segment;
  }

  constructor( private authService: AuthService,
    private firestore: AngularFirestore,  private router: Router , private dataService: DataService) {}

  ngOnInit() {

    this.authService.user$.subscribe((user: { uid: string | undefined; }) => {
      this.user = user;
      console.log(user?.uid)
      if (user) {
        // Dacă utilizatorul este autentificat, puteți să recuperați datele din Firestore
        this.userData$ = this.firestore
          .collection('users')
          .doc(user.uid)
          .valueChanges();
      }
      if (this.userData$ !== undefined) {

        this.userData$.subscribe(val => {
         this.dataService.userData = val;
        });
      }
      this.loadAlerts();
      this.setupSearch();
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']); // Redirecționează către pagina dorită după deconectare
    }).catch((error: any) => {
      console.error('Eroare la deconectare:', error);
    });;
  }

  loadAlerts(): void {
    this.firestore
      .collection('alerte')
      .valueChanges()
      .subscribe((data: any[]) => {
        this.alerts = data;
        this.filterData();
        this.sortData();
      });
  }

  setupSearch(): void {
    this.searchTerms
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.filterData();
      });
  }

  search(): void {
    this.searchTerms.next(this.filterText);
  }

  filterData(): void {
    const filter = this.filterText.toLowerCase();
    if (!filter) {
      // Cazul în care căsuța de căutare este goală, afișăm toate alertele
      this.loadAlerts();
    } else {
      this.alerts = this.alerts.filter((alert) =>
        alert.mesaj.toLowerCase().includes(filter)
      );
    }
  }

  sortData(): void {
    if (this.sortOrder === 'asc') {
      this.alerts.sort((a, b) =>
        a.timestamp.toMillis() - b.timestamp.toMillis()
      );
    } else {
      this.alerts.sort((a, b) =>
        b.timestamp.toMillis() - a.timestamp.toMillis()
      );
    }
  }
}
