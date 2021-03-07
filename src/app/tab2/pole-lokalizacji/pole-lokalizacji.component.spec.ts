import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoleLokalizacjiComponent } from './pole-lokalizacji.component';

describe('PoleLokalizacjiComponent', () => {
  let component: PoleLokalizacjiComponent;
  let fixture: ComponentFixture<PoleLokalizacjiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PoleLokalizacjiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoleLokalizacjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
