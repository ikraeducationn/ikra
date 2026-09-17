import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { IletisimComponent } from './iletisim.component';

describe('IletisimComponent', () => {
  let component: IletisimComponent;
  let fixture: ComponentFixture<IletisimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IletisimComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IletisimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('validates required fields and never reports a sent message', () => {
    component.review();
    fixture.detectChanges();
    expect(component.form.invalid).toBeTrue();
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toContain('eksik veya geçersiz');
    component.form.setValue({name: 'Test Kullanıcı', contact: 'test@example.com', subject: 'Bilgi', message: 'Eğitim hakkında bilgi almak istiyorum.'});
    component.review();
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toContain('Mesajınız gönderilmedi');
    component.form.controls.subject.setValue('   ');
    expect(component.form.invalid).toBeTrue();
  });
});
