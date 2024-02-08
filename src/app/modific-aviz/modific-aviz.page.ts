import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modific-aviz',
  templateUrl: './modific-aviz.page.html',
  styleUrls: ['./modific-aviz.page.scss'],
})
export class ModificAvizPage implements OnInit {
  avizData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService : DataService
  ) { }

  ngOnInit() {
    // Primiți datele de aviz prin state extras
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.avizData = this.router.getCurrentNavigation()?.extras?.state?.['myObject'];
      console.log('avizData', this.avizData);

      const dateObject = new Date(this.avizData['dataModificarii'].seconds * 1000);


      // Formatarea datei în formatul dd-mm-yyyy
      const day = dateObject.getDate().toString().padStart(2, '0'); console.log(day)
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Lunile încep de la 0, deci adăugăm 1
      const year = dateObject.getFullYear();
      // const [an, luna, zi] = docData['dataModificarii'].split("-");
      this.avizData['dataIntrariiView'] = `${day}-${month}-${year}`;
    } else {
      // Dacă nu există date, întoarceți-vă la pagina anterioară sau gestionați cum considerați
      this.router.navigateByUrl('/pagina-anterioara');
    }
  }

  onBackClicked() {
    this.dataService.clearAll();
    console.log('okok');
  }
}




