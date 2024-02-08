import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-introducere-facturi',
  templateUrl: './introducere-facturi.page.html',
  styleUrls: ['./introducere-facturi.page.scss'],
})
export class IntroducereFacturiPage implements OnInit {



  ngOnInit() {
  }

  documentNumber: string = '';
  documentSerie: string ='';

  constructor(private router: Router, private dataService : DataService) {}

  onSubmit() {
    // Aici puteți adăuga logica pentru validarea și gestionarea numărului documentului
    if (this.documentNumber.trim() !== '' && this.documentSerie.trim() != '' ){
      // Salvare în serviciul DataService
      this.dataService.documentNumber = this.documentNumber;
      this.dataService.documentSerie = this.documentSerie;

      // Navigați către următoarea pagină
      this.router.navigateByUrl('/gridarticole');
      console.log('tocmai generez',this.dataService.documentNumber);
    } else {
      // Documentul este gol, puteți afișa un mesaj de eroare sau faceți altă gestionare a erorii
    }



  }


  onBackClicked() {
    this.dataService.clearAll();
    console.log('okok');
  }



}
