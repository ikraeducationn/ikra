import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CanliGrupBasvuruComponent } from './canli-grup-basvuru.component';

describe('CanliGrupBasvuruComponent', () => {
  async function create() {
    await TestBed.configureTestingModule({imports: [CanliGrupBasvuruComponent], providers: [provideRouter([])]}).compileComponents();
    const fixture = TestBed.createComponent(CanliGrupBasvuruComponent);
    fixture.detectChanges();
    return fixture;
  }
  it('requires only the visible conditional field and clears hidden values', async () => {
    const fixture = await create();
    const form = fixture.componentInstance.form;
    form.controls.audience.setValue('adult');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#gender')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('#age')).toBeNull();
    expect(form.controls.gender.invalid).toBeTrue();
    form.controls.gender.setValue('woman');
    form.controls.audience.setValue('child');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#gender')).toBeNull();
    expect(fixture.nativeElement.querySelector('#age')).not.toBeNull();
    expect(form.controls.gender.disabled).toBeTrue();
    expect(form.controls.gender.value).toBe('');
    form.controls.age.setValue('0');
    expect(form.controls.age.invalid).toBeTrue();
    form.controls.age.setValue('8.5');
    expect(form.controls.age.invalid).toBeTrue();
    form.controls.age.setValue('8');
    expect(form.controls.age.valid).toBeTrue();
    form.controls.audience.setValue('youth');
    expect(form.controls.age.enabled).toBeTrue();
    expect(form.controls.age.value).toBe('');
    form.controls.age.setValue('16');
    form.controls.audience.setValue('adult');
    expect(form.controls.age.disabled).toBeTrue();
    expect(form.controls.age.value).toBe('');
    expect(form.value.age).toBeUndefined();
  });
  it('validates the form and explicitly reports that nothing was submitted', async () => {
    const fixture = await create();
    const component = fixture.componentInstance;
    component.review();
    fixture.detectChanges();
    expect(component.form.invalid).toBeTrue();
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toContain('eksik veya geçersiz');
    component.form.controls.audience.setValue('adult');
    component.form.patchValue({name: 'Test Kullanıcı', contact: '+43 670 1234567', gender: 'man', level: 'beginner', availability: 'Hafta içi öğleden sonra'});
    component.review();
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toContain('Yanıtlarınız gönderilmedi');
    component.form.controls.contact.setValue('invalid');
    expect(component.form.invalid).toBeTrue();
  });
});
