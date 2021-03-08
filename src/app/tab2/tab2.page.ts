import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { Config } from '../config';
import { LocationConfig, LocationType } from '../interfaces/location';
import { WeatherService } from '../services/weather.service';
import { Geolocation, Plugins } from '@capacitor/core';

const { Keyboard } = Plugins;
enum TempScale { Fahrenheit, Celsius }

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    currentMode = 'current';
    displayMode: string = this.currentMode;
    locationConfig: LocationConfig;
    searchInput: string;
    currentItems: Array<any> = [];
    forecastItems: Array<any> = [];
    pollutionItems: Array<any> = [];
    DAYS: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    searchinput: string;

  constructor(
    private service: WeatherService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public platform: Platform,
    private storage: NativeStorage,
  ) {
  }

  public getLocalWeather() {
    console.log('HomePage: getLocalWeather()');
    this.loadingCtrl.create({ message: 'Retrieving Location' })
      .then(loader => {
        // display it
        loader.present();
        // then go get the location
        const locOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
        Geolocation.getCurrentPosition(locOptions)
          // @ts-ignore
          .then((position: GeolocationCoordinates) => {
            // Hide the loading indicator
            loader.dismiss();
            // Do we have coordinates?
            if (position) {
              // Then populate the location config object
              this.locationConfig = {
                type: LocationType.Geolocation,
                value: {
                  longitude: position.coords.longitude,
                  latitude: position.coords.latitude
                }
              };
              this.updatePage();
            } else {
              const msg = 'Position object empty.';
              console.error(msg);
              this.service.showAlert(msg, 'Location Error');
            }
          })
          .catch(e => {
            // Hide the loading indicator
            loader.dismiss();
            console.error(e.message);
            this.service.showAlert(e.message, 'Location Error');
          });
      });
  }



  public updateForecast() {
    console.log('HomePage: updateForecast()');
    // clear out the previous array contents
    this.forecastItems = [];
    // Create the loading indicator
    this.loadingCtrl.create({ message: 'Retrieving forecast...' })
      .then(loader => {
        // Show the loading indicator
        loader.present();
        // then go get the weather
        this.service.getForecast(this.locationConfig).then(
          data => {
            // Hide the loading indicator
            loader.dismiss();
            // Now, populate the array with data from the weather service
            // Do we have some data?
            if (data) {
              // Then lets build the results array we need
              // Process each forecast period in the array
              for (const period of data.list) {
                // Create a record consisting of a time period's results
                const weatherValues: any = this.service.formatWeatherData(period);
                // Append this, along with the time period information, into the forecast
                // items array
                const d = new Date(period.dt_txt.replace(' ', 'T'));
                // Determine the day of the week
                const day = this.service.DAYS[d.getDay()];
                // And the time
                const tm = d.toLocaleTimeString();
                // Create a new object in the results array for this period
                this.forecastItems.push({ period: `${day} at ${tm}`, values: weatherValues });
              }
            } else {
              // This really should never happen
              console.error('Error displaying weather data: Data object is empty');
            }
          },
          error => {
            // Hide the loading indicator
            loader.dismiss();
            console.error('Error retrieving weather data');
            console.dir(error);
            this.service.showAlert(error);
          }
        );
      });
  }

  public  setCityName() {
    // whenever the user enters a zip code, replace the current location
    // with the entered value, then show current weather for the selected
    // location.
    console.log(`HomePage: setCityName(${this.searchInput})`);
    // Hide the keyboard if it's open, just in case
    // TODO: Put the following line back in for production
    Keyboard.hide();
    // Do we have input from the user?
    if (this.searchInput.length > 0) {
      // Is it a Zip Code?
      const re = RegExp('^[a-zA-Z ]*$');
      if (re.test(this.searchInput)) {
        // populate the location object
        this.locationConfig = {
          type: LocationType.CityName,
          value: { CityName: this.searchInput }
        };
        if (this.platform.ready) {
        this.storage.setItem('lokalizacja', {
          type: LocationType.CityName,
          value: { CityName: this.searchInput }
        })
       .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  }
        // Clear the Zip Code input field
        this.searchInput = '';
        // Switch to the 'current' tab
        this.displayMode = this.currentMode;
        // Update the page
        this.updatePage();
      } else {
        const msg = 'Wprowadzono niepoprawną nzawę miasta.';
        console.log(`HomePage: ${msg}`);
        this.service.showAlert(msg, 'Input Error', 'Try Again');
      }
    } else {
      const msg = 'Pole jest puste!.';
      console.log(`HomePage: ${msg}`);
      this.service.showAlert(msg, 'Input Error', 'Try Again');
    }
  }

  public  updatePage() {
    console.log('HomePage: updatePage()');
    // Do we have a location config?
    if (this.locationConfig) {
      // Get the weather conditions for the current location configuration
      // (zip code or geolocation)
      this.updateCurrentWeather();
      this.updateForecast();
      this.updateCurrentPollution();
    }
    if (this.platform.ready) {
      this.storage.getItem('lokalizacja')
      .then(
        data => this.locationConfig = data,
        error => console.error(error),
      );

    } else {
      console.log('HomePage: Skipping page update, no location set');
    }

  }

  public updateCurrentWeather() {
    console.log('HomePage: updateCurrentWeather()');
    // clear out the previous array contents
    this.currentItems = [];
    // Create the loading indicator
    this.loadingCtrl.create({ message: 'Retrieving current conditions...' })
      .then(loader => {
        // display it
        loader.present();
        // then go get the weather
        this.service.getCurrent(this.locationConfig)
          .then(data => {
            // Hide the loading indicator
            loader.dismiss();
            // Now, populate the array with data from the weather service
            if (data) {
              // We have data, so lets do something with it
              this.currentItems = this.service.formatWeatherData(data);
            }
          },
            error => {
              // Hide the loading indicator
              loader.dismiss();
              console.error('Error retrieving weather data');
              console.dir(error);
              this.service.showAlert(error);
            }
          );
      });
  }

  public viewForecast(item: any) {
    console.log('HomePage: viewForecast()');
    // When the user selects one of the Forecast periods,
    // open up the details page for the selected period.
    this.nav.navigateForward('/weather', { state: { forecast: item } });
  }

  public updateCurrentPollution() {
    console.log('HomePage: updateCurrentPollution()');
    // clear out the previous array contents
    this.pollutionItems = [];
    // Create the loading indicator
    this.loadingCtrl.create({ message: 'Retrieving pollution conditions...' })
      .then(loader => {
        // display it
        loader.present();
        // then go get the weather
        this.service.getPollution(this.locationConfig)
          .then(data => {
            // Hide the loading indicator
            loader.dismiss();
            // Now, populate the array with data from the weather service
            if (data) {
              // We have data, so lets do something with it
              this.pollutionItems = this.service.formatPollutionData(data);
            }
          },
            error => {
              // Hide the loading indicator
              loader.dismiss();
              console.error('Error retrieving weather data');
              console.dir(error);
              this.service.showAlert(error);
            }
          );
      });
  }

  ionViewDidEnter() {
    console.log('HomePage: ionViewDidEnter()');
    // Make sure our Config file is populated
    console.log('Checking app configuration');
    if (Config.weatherKey.length < 1) {
      const msg = 'Missing Config.weatherKey value';
      console.warn(msg);
      this.service.showAlert(msg, 'Configuration Error', 'Try Again');
    } else {
      // Populate the page with the current location data
      this.getLocalWeather();
    }
  }
}
