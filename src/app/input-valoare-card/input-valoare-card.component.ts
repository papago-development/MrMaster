import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { numericIndexGetter } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-input-valoare-card',
  templateUrl: './input-valoare-card.component.html',
  styleUrls: ['./input-valoare-card.component.scss'],
})

export class InputValoareCardComponent  implements OnInit {

@Input() suma: any | undefined;


saveValue(value: any, suma : any) {
  // Trimite valoarea către componenta părinte
  const cantitate = value // Înlocuiți cu prima valoare reală

  // Încapsulați cele două valori într-un obiect
  const data = { suma: this.suma, value};
  console.log('data',data);
  // console.log(this.reper.suma);
  this.modalController.dismiss(data);

}


async dismissModal() {
  await this.modalController.dismiss();
}


closeDialog() {
  this.modalController.dismiss();
}
value: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('ok')
  }

}
