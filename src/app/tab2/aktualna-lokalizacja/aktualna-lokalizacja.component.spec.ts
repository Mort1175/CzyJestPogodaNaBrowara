import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AktualnaLokalizacjaComponent } from './aktualna-lokalizacja.component';

describe('AktualnaLokalizacjaComponent', () => {
  let component: AktualnaLokalizacjaComponent;
  let fixture: ComponentFixture<AktualnaLokalizacjaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AktualnaLokalizacjaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AktualnaLokalizacjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
