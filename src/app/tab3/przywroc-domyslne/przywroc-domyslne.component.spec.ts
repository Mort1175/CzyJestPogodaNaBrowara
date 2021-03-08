import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PrzywrocDomyslneComponent } from './przywroc-domyslne.component';

describe('PrzywrocDomyslneComponent', () => {
  let component: PrzywrocDomyslneComponent;
  let fixture: ComponentFixture<PrzywrocDomyslneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrzywrocDomyslneComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrzywrocDomyslneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
