import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Article } from './article.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public documentNumber: string  ='';
  public documentSerie: string  ='';
  public selectedArticles: Article[] | undefined = [] // Folosind interfața Article
  public quantity: number | undefined;
  public userData: any;

  constructor() { this.selectedArticles = []; }

  clearAll(){
    this.documentNumber  ='';
    this.documentSerie ='';
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
    // const existingArticle = this.selectedArticles?.find((article) => article.numeArticol === item.numeArticol);

    // if (existingArticle) {
    //   // Dacă există deja un articol cu același nume, actualizează cantitatea
    //   existingArticle.cantitate += item.cantitate;
    // } else {
    //   // Dacă nu există, adaugă un nou articol în listă

    //   if (this.selectedArticles) {
    //     // Dacă selectedArticles există, adăugați elemente în el
    //     this.selectedArticles.push(item);
    //   } else {
    //     // Dacă selectedArticles nu există, inițializați-l cu un array gol și adăugați elementul
    //     this.selectedArticles = [item];
    //   }
    //   // this.selectedArticles?.push(item);
    // }


    // La adăugarea sau actualizarea unui articol
const existingIndex = this.selectedArticles?.findIndex(article => article.numeArticol === item.numeArticol) || -1;
  if (this.selectedArticles) {
        if (existingIndex > -1) {
          // Dacă articolul există, actualizează doar cantitatea
          this.selectedArticles[existingIndex].cantitate += item.cantitate;
        } else {
          // Dacă articolul nu există, setează numarCurent și adaugă articolul la listă
          item.numarCurent = this.selectedArticles.length + 1;
          this.selectedArticles.push(item);
        }
  }



  }



  getPunctdeLucru(){
    return this.userData;
  }
}
