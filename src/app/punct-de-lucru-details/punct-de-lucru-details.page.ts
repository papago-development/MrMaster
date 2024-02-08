import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-punct-de-lucru-details',
  templateUrl: './punct-de-lucru-details.page.html',
  styleUrls: ['./punct-de-lucru-details.page.scss'],
})
export class PunctDeLucruDetailsPage implements OnInit {

  details:any;
  constructor(private router: Router,private dataService: DataService) { }

  ngOnInit() {
    if (this.router?.getCurrentNavigation()?.extras.state) {
      this.details = this.router.getCurrentNavigation()?.extras?.state?.['myObject'];
      console.log('detail',this.details);
  }
}

  navigateTo(section: string, punctDeLucru: string) {
    console.log(this.details);
    let navigationExtras: NavigationExtras = {
      state: {
        myObject: this.details
      }
    };

    this.router.navigateByUrl(`/${section}`, navigationExtras);
  }

  onBackClicked() {
    this.dataService.clearAll();
    console.log('okok');
  }

}

