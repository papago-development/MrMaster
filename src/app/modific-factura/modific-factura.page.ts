import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modific-factura',
  templateUrl: './modific-factura.page.html',
  styleUrls: ['./modific-factura.page.scss'],
})
export class ModificFacturaPage implements OnInit {

  selectedInvoice: any;
  // invoiceForm: FormGroup;
  invoice: any;


  constructor(private route: Router,
         private alertController: AlertController,
         private dataService : DataService,
         private fb: FormBuilder,
         private firestore: AngularFirestore) {

    // this.invoiceForm = this.fb.group({
    //   documentSerie: ['', Validators.required],
    //   documentNumber: ['', Validators.required],
    //   dataModificarii: ['', Validators.required],
    //   selectedArticles: this.fb.array([]),
    // });
   }

  ngOnInit() {
    if (this.route?.getCurrentNavigation()?.extras.state) {
      this.invoice = this.route.getCurrentNavigation()?.extras?.state?.['myObject'];
      console.log(this.invoice);
      // this.invoiceForm.patchValue(this.invoice);
      // this.invoice.selectedArticles.forEach((article: any) => {
      //   this.selectedArticles.push(this.createArticleGroup(article));
      // });
    }
  }

  // get selectedArticles() {
  //   return this.invoiceForm.get('selectedArticles') as FormArray;
  // }

  // createArticleGroup(article: any) {
  //   return this.fb.group({
  //     numeArticol: [{'value': article.numeArticol, disabled: true},Validators.required ],
  //     cantitate: [article.cantitate, Validators.required],
  //     // Adaugă aici și celelalte câmpuri pentru fiecare articol
  //   });
  // }

  // async onSubmit() {
  //   // const formValue = this.invoiceForm.value;

  //   const formattedDate = new Date(formValue.dataModificarii);
  //   // .toLocaleString('en-US', { timeZone: 'Europe/Bucharest' });

  //   const updatedInvoiceData = {
  //     ...this.invoice,

  //     ...formValue,
  //     dataModificarii: formattedDate,
  //     selectedArticles: formValue.selectedArticles.map((article: any, index: number) => {
  //       return {
  //         ...this.invoice.selectedArticles[index],
  //         cantitate: article.cantitate
  //       };
  //     })
  //   };

  //   console.log('ivoice',this.invoice)
  //   console.log('formValue',formValue);
  //   console.log('updated',updatedInvoiceData)
  //   // Format data într-un format complet, dacă este necesar
  //   if (updatedInvoiceData.data) {
  //     updatedInvoiceData.data = new Date(updatedInvoiceData.data).toISOString();
  //   }

  //   // Actualizați factura în Firestore
  //   try {
  //     await this.firestore.collection('facturi').doc(updatedInvoiceData.documentId).update(updatedInvoiceData);
  //     console.log('Invoice updated successfully!');
  //   } catch (error) {
  //     console.error('Error updating invoice: ', error);
  //   }
  // }


  openDatePicker(){

  }

  onBackClicked() {
    this.dataService.clearAll();
    console.log('okok');
  }

}
