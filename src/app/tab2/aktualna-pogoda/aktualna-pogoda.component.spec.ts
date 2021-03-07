import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AktualnaPogodaComponent } from './aktualna-pogoda.component';

describe('AktualnaPogodaComponent', () => {
  let component: AktualnaPogodaComponent;
  let fixture: ComponentFixture<AktualnaPogodaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AktualnaPogodaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AktualnaPogodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
