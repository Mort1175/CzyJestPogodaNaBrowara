import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { AktualnaLokalizacjaComponent } from './aktualna-lokalizacja/aktualna-lokalizacja.component';
import { AktualnaPogodaComponent } from './aktualna-pogoda/aktualna-pogoda.component';
import { GPSComponent } from './gps/gps.component';
import { PoleLokalizacjiComponent } from './pole-lokalizacji/pole-lokalizacji.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [
    Tab2Page,
    AktualnaLokalizacjaComponent,
    AktualnaPogodaComponent,
    GPSComponent,
    PoleLokalizacjiComponent,
    ]
})
export class Tab2PageModule {}
