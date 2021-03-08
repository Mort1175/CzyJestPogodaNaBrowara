import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  forecast: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('WeatherPage: constructor()');
  }

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(params => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.forecast = state.forecast;
      console.log(params);
    });
  }
}
