import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { LocationConfig, LocationType } from '../interfaces/location';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';

enum TempScale { Fahrenheit, Celsius }

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  currentMode = 'current';
  displayMode: string = this.currentMode;
  locationConfig: LocationConfig;
  searchInput: string;
  currentItems: Array<any> = [];
  forecastItems: Array<any> = [];
  DAYS: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public platform: Platform,
  ) {
    console.log('WeatherService: constructor()');
  }

  public formatWeatherData(data: any): any {
    // TODO: Should probably move this to the weather service
    console.log('HomePage: formatWeatherData()');
    // create a blank array to hold our results
    const tmpArray = [];
    // Add the weather data values to the array
    if (data.name) {
      // Location name will only be available for current conditions
      tmpArray.push({ name: 'Lokalizacja', value: data.name });
    }
    tmpArray.push({ name: 'Pogoda', value: `${data.weather[0].description}` });
    tmpArray.push({ name: 'Temperatura śr.', value: this.makeDegreeString(data.main.temp) });
    tmpArray.push({ name: 'Odczuwalna', value: this.makeDegreeString(data.main.feels_like) });
    tmpArray.push({ name: 'Wilgotność', value: `${data.main.humidity} %` });
    tmpArray.push({ name: 'Ciśnienie', value: `${data.main.pressure} hPa` });
    tmpArray.push({ name: 'Wiatr', value: `${data.wind.speed} km/h` });
    tmpArray.push({ name: 'Kierunek Wiatru', value: `${data.wind.deg} °` });
    tmpArray.push({ name: 'Zachmurzenie', value: `${data.clouds.all} %` });
    // Do we have visibility data?
//    if (data.visibility) {
//      tmpArray.push({ name: 'Visibility', value: `${data.visibility} meters` });
//    }
    // do we have sunrise/sunset data?
//    if (data.sys.sunrise) {
//      const sunriseDate = new Date(data.sys.sunrise * 1000);
//      tmpArray.push({ name: 'Sunrise', value: sunriseDate.toLocaleTimeString() });
//    }
//    if (data.sys.sunset) {
//      const sunsetDate = new Date(data.sys.sunset * 1000);
//      tmpArray.push({ name: 'Sunset', value: sunsetDate.toLocaleTimeString() });
//
 //   }
    // Do we have a coordinates object? only if we passed it in on startup
//    if (data.coord) {
//      // Then grab long and lat
//      tmpArray.push({ name: 'Latitude', value: data.coord.lat });
//      tmpArray.push({ name: 'Longitude', value: data.coord.lon });
//    }
    // Return the new array to the calling function
    tmpArray.push({ name: 'Temperatura min.', value: this.makeDegreeString(data.main.temp_min) });
    tmpArray.push({ name: 'Temperatura maks.', value: this.makeDegreeString(data.main.temp_max) });
    return tmpArray;
  }

  private makeWeatherURL(loc: LocationConfig, command: string): string {
    // Build a weather service URL using the command string and
    // location data that we have.
    // Current Conditions
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139
    // api.openweathermap.org/data/2.5/weather?zip=94040,us
    // Forecast
    // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}
    // api.openweathermap.org/data/2.5/forecast/daily?zip=94040,us
    console.log('WeatherService: makeWeatherURL()');
    // console.dir(loc);
    let uri = Config.weatherEndpoint + command;
    if (loc.type === LocationType.Geolocation) {
      console.log('makeWeatherURL: Building Location URL');
      // @ts-ignore
      uri += `?lat=${loc.value.latitude}&lon=${loc.value.longitude}`;
    } else {
      console.log('makeWeatherURL: Building City Name URL');
      // @ts-ignore
      uri += `?q=${loc.value.CityName}`;
    }
    // Configure output for imperial (English) measurements
    uri += '&units=metric';
    // Use the following instead for metric
    //  uri += '&units=metric';
    // Append the API Key to the end of the URI
    uri += `&appid=${Config.weatherKey}`;
    uri += `&lang=pl`;
    console.log(`Service URL: ${uri}`);
    // Return the value
    return uri;
  }

  public  makeDegreeString(temperatureValue: number) {
  return `${temperatureValue.toFixed(0)} °C`;
  }

  public showAlert(theMessage: string, theHeader: string = 'Error', theButton: string = 'Sorry') {
  this.alertController.create({
    header: theHeader,
    message: theMessage,
    buttons: [{ text: theButton }]
  }).then((alert) => alert.present());
  }

  getCurrent(loc: LocationConfig): Promise<any> {
    console.log('WeatherService: getCurrent()');
    const url: string = this.makeWeatherURL(loc, 'weather');
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        resolve(data);
      }, error => {
        console.error(error.message);
        reject(error.message);
      });
    });
  }

  getForecast(loc: LocationConfig): Promise<any> {
    console.log('WeatherService: getForecast()');
    const url: string = this.makeWeatherURL(loc, 'forecast');
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        resolve(data);
      }, error => {
        console.error(error.message);
        reject(error.message);
      });
    });
  }
}
