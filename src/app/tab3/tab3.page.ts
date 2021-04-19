import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';
import { Preferencje, Warunki } from '../interfaces/preferencje';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  value = [];
  temperatura: any;
  wilgotnosc: any;
  wiatr: any;
  constructor(
    public appPreferences: AppPreferences,
    private preferencje: Preferencje,
    private warunki: Warunki,
    ) {
  }

  czyZawiera(value) {
    const arrayChip = ['4', '4', '5', '5', '7', '34', '1', '9', '7', '9', '4', '3'];
    const iDislike = ['Web 3', '2', '4', '5', '6'];
    const allIDislikeDoesntExistInArrayChip = iDislike.every(item => !arrayChip.includes(item));
    console.log(allIDislikeDoesntExistInArrayChip);
  }

pozyskajPreferencje() {
  this.appPreferences.fetch('key').then((res) => { console.log(res); });
}
zapiszPreferencje(preferencja) {
  this.appPreferences.store( preferencja.dict , preferencja.key, preferencja.value).then((res) => { console.log(res); });
}

// Serwis sprawdzający warunki

sprawdzWszystko() {

}
sprawdzTemperature() {
 if (this.preferencje.temperaturaMaks < this.warunki.temperatura > this.preferencje.temperaturaMin ) {

 }
}
sprawdzWiatr() {
  if (this.preferencje.wiatr < this.warunki.wiatr ) {

  }
}
sprawdzWilgotnosc(){
 if (this.preferencje.wilgotnoscMaks < this.warunki.temperatura > this.preferencje.wilgotnoscMin ) {

 }
}


sprawdzWarunki(){

  }

}


