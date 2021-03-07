import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  forecast: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
 // ngOnInit() {
 //   this.route.queryParams.subscribe(params => {
 //   const state = this.router.getCurrentNavigation().extras.state;
 //   this.forecast = state.forecast;
 // });
 // }
 // }
 // }
}
