import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Article } from './article.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public documentNumber: string | undefined;
  public documentSerie: string | undefined;
  public selectedArticles: Article[] | undefined = [] // Folosind interfața Article
  public quantity: number | undefined;
  public userData: any;

  constructor() { }

  clearAll(){
    this.documentNumber = undefined;
    this.documentSerie =undefined;
    this.selectedArticles = [];

  }
  removeArticleByName(item: Article) {
    const indexToRemove = this.selectedArticles?.findIndex(
      (article) => article.numeArticol === item.numeArticol
    );
    if (typeof indexToRemove !== 'undefined' && indexToRemove !== -1) {
      this.selectedArticles?.splice(indexToRemove, 1);
    }
  }

  addOrUpdateArticle(item: Article) {
    // Caută un articol cu același nume în listă
    const existingArticle = this.selectedArticles?.find((article) => article.numeArticol === item.numeArticol);

    if (existingArticle) {
      // Dacă există deja un articol cu același nume, actualizează cantitatea
      existingArticle.cantitate += item.cantitate;
    } else {
      // Dacă nu există, adaugă un nou articol în listă

      if (this.selectedArticles) {
        // Dacă selectedArticles există, adăugați elemente în el
        this.selectedArticles.push(item);
      } else {
        // Dacă selectedArticles nu există, inițializați-l cu un array gol și adăugați elementul
        this.selectedArticles = [item];
      }
      // this.selectedArticles?.push(item);
    }


  }



  getPunctdeLucru(){
    return this.userData;
  }
}
