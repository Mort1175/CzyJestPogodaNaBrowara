import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrzyciskCzyJestComponent } from './przycisk-czy-jest.component';

describe('PrzyciskCzyJestComponent', () => {
  let component: PrzyciskCzyJestComponent;
  let fixture: ComponentFixture<PrzyciskCzyJestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrzyciskCzyJestComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrzyciskCzyJestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
