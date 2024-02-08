import { Component, ViewChild } from '@angular/core';
import { IonicSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(private navCtrl: NavController) {}
  segment = 'introducere';

  @ViewChild(IonicSlides, { static: false }) slides: any;



  slideChanged() {
    this.slides.getActiveIndex().then((index: number) => {
      if (index === 0) {
        this.segment = 'introducere';
      } else if (index === 1) {
        this.segment = 'situatii';
      } else {
        this.segment = 'editare';
      }
    });
  }

  segmentChanged(ev: any) {
    if (this.segment === 'introducere') {
      this.slides.slideTo(0);
    } else if (this.segment === 'situatii') {
      this.slides.slideTo(1);
    } else {
      this.slides.slideTo(2);
    }
  }

  goToIntroducereFacturi() {
    this.navCtrl.navigateForward('/introducere-facturi');
    }
    goToEditareFacturi() {
      this.navCtrl.navigateForward('/editare-facturi');
      }
    goToSituatieStocuri(){
      this.navCtrl.navigateForward('/stocuri');
    }
}













