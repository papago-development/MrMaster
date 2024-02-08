import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../dataservice.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreserviceService } from '../firestoreservice.service';

@Component({
  selector: 'app-inputrepervalue',
  templateUrl: './inputrepervalue.component.html',
  styleUrls: ['./inputrepervalue.component.scss'],
})
export class InputrepervalueComponent  implements OnInit {


  @Input() buttonName: string | undefined;
  value: number | undefined;
  um : string | undefined;


  constructor(private modalController: ModalController, private dataService: DataService, private fs: FirestoreserviceService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');

  }

  closeDialog() {
    this.modalController.dismiss();
  }

  saveValue(value: any) {
    // Trimite valoarea către componenta părinte
    console.log('saved value',value, this.buttonName);
    const buttonName: string  = this.buttonName || ''
    const cantitate = value // Înlocuiți cu prima valoare reală
    const reper = this.buttonName; // Înlocuiți cu a doua valoare reală
    // const lungime = (this.dataService.selectedArticles?.length ?? 0) + 1;
    let um: string  = "";

    this.fs.getUmByButtonName(buttonName).subscribe(data => {
      if (data.length > 0) {
        console.log('data',data);
        // Presupunem că interogarea returnează cel puțin un rezultat
        um = data[0].um; // Preia primul rezultat
        console.log('um',um);
      }
      else {
        um = ""
      }
      const dataModal = { cantitate, reper, um };
      console.log('data din modal', dataModal);
      this.modalController.dismiss(dataModal);

    });


    // let um = this.um;
    // Încapsulați cele două valori într-un obiect

    // console.log(this.buttonName);
  }

}
