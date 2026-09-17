import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UyelikBasvuruComponent } from './uyelik-basvuru.component';

describe('Membership suitability form', () => {
  async function create() {
    await TestBed.configureTestingModule({ imports: [UyelikBasvuruComponent], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(UyelikBasvuruComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('shows validation errors for an empty form', async () => {
    const fixture = await create();
    fixture.nativeElement.querySelector('button[type=submit]').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.form.invalid).toBeTrue();
    expect(fixture.componentInstance.form.controls.name.touched).toBeTrue();
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toContain('eksik veya geçersiz');
  });

  it('accepts uncertainty without rejection and explicitly reports no submission', async () => {
    const fixture = await create();
    const form = fixture.componentInstance.form;
    form.setValue({ name: 'Test Kullanıcı', contact: 'test@example.com', level: 'beginner', elifba: 'unsure', routine: 'unsure', weekly: true, checkpoints: true, period: true, goal: '' });
    fixture.componentInstance.review();
    fixture.detectChanges();
    expect(form.valid).toBeTrue();
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toContain('Yanıtlarınız gönderilmedi');
    form.controls.contact.setValue('invalid');
    expect(form.controls.contact.invalid).toBeTrue();
    form.controls.contact.setValue('+43 670 1234567');
    expect(form.controls.contact.valid).toBeTrue();
    form.controls.period.setValue(false);
    expect(form.invalid).toBeTrue();
  });
});
