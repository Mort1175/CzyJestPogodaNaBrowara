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
  pollutionItems: Array<any> = [];
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

  public formatPollutionData(data: any): any {

    console.log('HomePage: formatPollutionData()');
    // create a blank array to hold our results
    const tmpArray = [];
    // Add the weather data values to the array

    if (data.list[0].main.aqi) {
      // Location name will only be available for current conditions
      tmpArray.push({ name: 'Jakość ', value: data.list[0].main.aqi });
    }

    tmpArray.push({ name: 'CO ', value: `${data.list[0].components.co}  μg/m3` });
    tmpArray.push({ name: 'NO ', value: `${data.list[0].components.no}  μg/m3` });
    tmpArray.push({ name: 'NO2', value: `${data.list[0].components.no2}  μg/m3` });
    tmpArray.push({ name: 'O3 ', value: `${data.list[0].components.o3}  μg/m3` });
    tmpArray.push({ name: 'SO2 ', value: `${data.list[0].components.so2}  μg/m3` });
    tmpArray.push({ name: 'PM2.5 ', value: `${data.list[0].components.pm2_5}  μg/m3` });
    tmpArray.push({ name: 'PM10 ', value: `${data.list[0].components.pm10}  μg/m3` });
    tmpArray.push({ name: 'NH3 ', value: `${data.list[0].components.nh3}  μg/m3` });


    return tmpArray;
  }



  private makePollutionURL(loc: LocationConfig, command: string): string {
    console.log('WeatherService: makePollutionURL()');
    let uri = Config.weatherEndpoint + command;
    if (loc.type === LocationType.Geolocation) {
      console.log('makePollutionURL: Building Location URL');
      // @ts-ignore
      uri += `?lat=${loc.value.latitude}&lon=${loc.value.longitude}`;
    }
    uri += `&appid=${Config.weatherKey}`;
    console.log(`Service URL: ${uri}`);
    return uri;
  }

  private makeWeatherURL(loc: LocationConfig, command: string): string {
    console.log('WeatherService: makeWeatherURL()');
    let uri = Config.weatherEndpoint + command;
    if (loc.type === LocationType.Geolocation) {
      console.log('makeWeatherURL: Building Location URL');
      // @ts-ignore
      uri += `?lat=${loc.value.latitude}&lon=${loc.value.longitude}`;
      uri += `&lang=pl`;
    } else {
      console.log('makeWeatherURL: Building City Name URL');
      // @ts-ignore
      uri += `?q=${loc.value.CityName}`;
    }
    uri += '&units=metric';
    uri += `&appid=${Config.weatherKey}`;
    console.log(`Service URL: ${uri}`);

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

    getPollution(loc: LocationConfig): Promise<any> {
    console.log('WeatherService: getPollution()');
    const url: string = this.makePollutionURL(loc, 'air_pollution');
    return new Promise((resolve, reject) => {
    this.http.get(url).subscribe(data => {
      resolve(data);
    }, error => {
      console.error(error.message);
      reject(error.message);
    });
  });
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
