import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-intrari',
  templateUrl: './avize.page.html',
  styleUrls: ['./avize.page.scss'],
})
export class AvizePage implements OnInit {

  ngOnInit() {
    if (this.router?.getCurrentNavigation()?.extras.state) {
      this.pctdelucru = this.router.getCurrentNavigation()?.extras?.state?.['myObject'];
      console.log('detail',this.pctdelucru);
  }
  }

  documentNumber: string = '';
  documentSerie: string ='';
  pctdelucru: any;


  constructor(private router: Router, private dataService : DataService) {}

  onSubmit() {




    // Aici puteți adăuga logica pentru validarea și gestionarea numărului documentului
    if (this.documentNumber.trim() !== '' && this.documentSerie.trim() != '' ){
      // Salvare în serviciul DataService
      console.log('documentNumber:', this.documentNumber);
      console.log('documentSerie:', this.documentSerie);


      this.dataService.documentNumber = this.documentNumber;
      this.dataService.documentSerie = this.documentSerie;
      console.log('docuSerie',this.dataService.documentSerie, this.dataService.documentSerie);

      let navigationExtras: NavigationExtras = {
        state: {
          myObject: this.pctdelucru
        }
      };
      this.router.navigateByUrl('gridarticolepctdelucru', navigationExtras);






    } else {
      // Documentul este gol, puteți afișa un mesaj de eroare sau faceți altă gestionare a erorii
    }

  }
  }
