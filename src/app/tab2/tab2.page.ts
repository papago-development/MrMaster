import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularfirestoreService } from '../angularfirestore.service';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
redirectToLogin() {
  this.navCtrl.navigateRoot('/tabs/tab3');
}
  public puncteDeLucru: any[] | undefined;
  errorMNessage='';


  constructor(private fs: AngularfirestoreService,private router: Router, private navCtrl: NavController) {}
  ngOnInit() {
    this.fs.getPuncteDeLucru().subscribe((data: any[] | undefined) => {
      this.puncteDeLucru = data;
    },
    (error) => {
      this.errorMNessage = 'Nu suneti logat.';
    });
  }
  openPunctDeLucruDetails(punctDeLucru: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        myObject: punctDeLucru
      }
    };

    this.router.navigateByUrl('/punct-de-lucru-details',navigationExtras);
    // this.router.navigate(['/punct-de-lucru-details', { details: JSON.stringify(punctDeLucru) }]);
  }

}
