import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AngularfirestoreService {

  constructor(private firestore: AngularFirestore) { }
  getRepere(){
    // return this.firestore.collection('repere').valueChanges<Icon[]>());
    return this.firestore.collection('repere').valueChanges();

  }

  getPuncteDeLucru(){
    return this.firestore.collection('punctedelucru').valueChanges();
  }

}
