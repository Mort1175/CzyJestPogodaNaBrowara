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

  icon: string;
  currentMode = 'current';
  displayMode: string = this.currentMode;
  locationConfig: LocationConfig;
  searchInput: string;
  currentItems: Array<any> = [];
  forecastItems: Array<any> = [];
  pollutionItems: Array<any> = [];
  weatherCondition: Array<any> = [ '200', '201', '202', '210', '211', '212', '221', '230', '231', '232',
                                   '300', '301', '302', '310', '311', '312', '313', '314', '321',
                                   '500', '501', '502', '503', '504', '511', '520', '521', '522', '531',
                                   '600', '601', '602', '611', '612', '613', '615', '616', '620', '621', '622',
                                   '701', '711', '721', '731', '741', '751', '761', '762', '771', '781',
                                   '800',
                                   '801', '802', '803', '804'];
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
    tmpArray.push({ name: 'Temperatura ??r.', value: this.makeDegreeString(data.main.temp) });
    tmpArray.push({ name: 'Odczuwalna', value: this.makeDegreeString(data.main.feels_like) });
    tmpArray.push({ name: 'Wilgotno????', value: `${data.main.humidity} %` });
    tmpArray.push({ name: 'Ci??nienie', value: `${data.main.pressure} hPa` });
    tmpArray.push({ name: 'Wiatr', value: `${data.wind.speed} km/h` });
    tmpArray.push({ name: 'Kierunek Wiatru', value: `${data.wind.deg} ??` });
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
    tmpArray.push({ name: 'KodWarunk??w', value: `${data.weather[0].id}` });
    tmpArray.push({ name: 'Warunki:', value: `${data.weather[0].main}` });
    tmpArray.push({ wartosc: 'ikona', value: `${data.weather[0].icon}` });
    return tmpArray;
  }

  public formatPollutionData(data: any): any {

    console.log('HomePage: formatPollutionData()');
    // create a blank array to hold our results
    const tmpArray = [];
    // Add the weather data values to the array

    if (data.list[0].main.aqi) {
      // Location name will only be available for current conditions
      tmpArray.push({ name: 'Jako???? ', value: data.list[0].main.aqi });
    }

    tmpArray.push({ name: 'CO ', value: `${data.list[0].components.co}  ??g/m3` });
    tmpArray.push({ name: 'NO ', value: `${data.list[0].components.no}  ??g/m3` });
    tmpArray.push({ name: 'NO2', value: `${data.list[0].components.no2}  ??g/m3` });
    tmpArray.push({ name: 'O3 ', value: `${data.list[0].components.o3}  ??g/m3` });
    tmpArray.push({ name: 'SO2 ', value: `${data.list[0].components.so2}  ??g/m3` });
    tmpArray.push({ name: 'PM2.5 ', value: `${data.list[0].components.pm2_5}  ??g/m3` });
    tmpArray.push({ name: 'PM10 ', value: `${data.list[0].components.pm10}  ??g/m3` });
    tmpArray.push({ name: 'NH3 ', value: `${data.list[0].components.nh3}  ??g/m3` });


    return tmpArray;
  }

  public formatIconData(data: any): any {
    // TODO: Should probably move this to the weather service
    console.log('HomePage: formatIconData()');
    // create a blank array to hold our results
    let ikona: string;
    // Add the weather data values to the array
    if (data.name) {
      // Location name will only be available for current conditions
      ikona = data.weather[0].icon;
    }
    return ikona;
  }


  public makeIconURL(ikona: string): string {
    console.log('WeatherService: makeIconURL()');
    let uri = Config.weatherIconEndpoint;
    uri += `${ikona}`;
    uri += `${Config.iconFormat}`;
    console.log(`Service URL: ${uri}`);
    return uri;
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
  return `${temperatureValue.toFixed(0)} ??C`;
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
    // tslint:disable-next-line: deprecation
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
      // tslint:disable-next-line: deprecation
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
      // tslint:disable-next-line: deprecation
      this.http.get(url).subscribe(data => {
        resolve(data);
      }, error => {
        console.error(error.message);
        reject(error.message);
      });
    });
  }
//
//  weatherConditionsCheck() {
//    if (this.forecastItems.) {
//      return  this.icon = '01d';
//    }
//
//  }
}
