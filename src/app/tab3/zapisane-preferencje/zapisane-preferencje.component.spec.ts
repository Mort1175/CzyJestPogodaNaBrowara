import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ZapisanePreferencjeComponent } from './zapisane-preferencje.component';

describe('ZapisanePreferencjeComponent', () => {
  let component: ZapisanePreferencjeComponent;
  let fixture: ComponentFixture<ZapisanePreferencjeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZapisanePreferencjeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZapisanePreferencjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
