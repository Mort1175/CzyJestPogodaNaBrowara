import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ZapisanePreferencjeComponent } from './zapisane-preferencje/zapisane-preferencje.component';
import { PrzywrocDomyslneComponent } from './przywroc-domyslne/przywroc-domyslne.component';
import { PolePreferencjiComponent } from './pole-preferencji/pole-preferencji.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [
    Tab3Page,
    ZapisanePreferencjeComponent,
    PrzywrocDomyslneComponent,
    PolePreferencjiComponent,
  ]
})
export class Tab3PageModule {}
