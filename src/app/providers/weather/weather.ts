import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey = 'a8449ff9f8d33572';
  url;

  constructor(public http: HTTP) {
    console.log('Hello WeatherProvider Provider');

    this.url = 'http://api.wunderground.com/api/' + this.apiKey + '/conditions/q';
  }

  // Following function takes city and state as an input
  getWeather(city, state) {
    return this.http.get(this.url + '/' + state + '/' + city + '.json', {}, {})
           .then(result => console.log(result.data())
           );
  }

}
