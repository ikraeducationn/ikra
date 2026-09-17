import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DeneyimlerComponent } from './deneyimler.component';

describe('DeneyimlerComponent', () => {
  let component: DeneyimlerComponent;
  let fixture: ComponentFixture<DeneyimlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeneyimlerComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeneyimlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelectorAll('.review-card').length).toBe(6);
    expect(Array.from(page.querySelectorAll('.review-card h3')).map(el => el.textContent?.trim()))
      .toEqual(['Esmanur T.', 'Burcu U.', 'Leman A.', 'İsmail Y.', 'Nedime', 'Dilek']);
    expect(Array.from(page.querySelectorAll('.review-source')).map(el => el.textContent?.trim()))
      .toEqual(['Google Yorumu', 'Öğrenci Görüşü', 'Google Yorumu', 'Google Yorumu', 'Veli Görüşü', 'Veli Görüşü']);
    expect(page.querySelectorAll('.review-card img, .rating, .fa-star').length).toBe(0);
    expect(page.textContent).not.toContain('yakında burada paylaşacağız');
    expect(page.querySelectorAll('.testimonial-card, .rating, .avatar, .filters').length).toBe(0);
    expect(page.textContent).not.toMatch(/Kuranogren|Ali|Elif|Hamza/);
  });
});
