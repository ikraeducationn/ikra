import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AnasayfaComponent } from './anasayfa.component';

describe('AnasayfaComponent', () => {
  let component: AnasayfaComponent;
  let fixture: ComponentFixture<AnasayfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnasayfaComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnasayfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
