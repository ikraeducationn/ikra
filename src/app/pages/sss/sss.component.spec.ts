import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SssComponent } from './sss.component';

describe('SssComponent', () => {
  let component: SssComponent;
  let fixture: ComponentFixture<SssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SssComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('opens the registration answer with the correct links and closes it again', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.faq-q') as NodeListOf<HTMLButtonElement>;
    const registration = buttons[buttons.length - 1];
    registration.click();
    fixture.detectChanges();
    expect(registration.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('a[href="/uyelik-basvuru"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/canli-grup-basvuru"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/iletisim"]')).not.toBeNull();
    registration.click();
    fixture.detectChanges();
    expect(registration.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('.faq-a')).toBeNull();
  });
});
