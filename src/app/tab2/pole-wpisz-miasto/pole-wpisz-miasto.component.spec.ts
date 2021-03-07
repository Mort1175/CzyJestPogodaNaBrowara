import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoleWpiszMiastoComponent } from './pole-wpisz-miasto.component';

describe('PoleWpiszMiastoComponent', () => {
  let component: PoleWpiszMiastoComponent;
  let fixture: ComponentFixture<PoleWpiszMiastoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PoleWpiszMiastoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoleWpiszMiastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
