import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-canli-grup-basvuru',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './canli-grup-basvuru.component.html',
  styleUrls: ['../page-intro.css', '../uyelik-basvuru/uyelik-basvuru.component.css']
})
export class CanliGrupBasvuruComponent {
  private readonly fb = inject(FormBuilder);
  checked = false;
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/\S.*\S/), Validators.maxLength(100)]],
    contact: ['', [Validators.required, Validators.pattern(/^(?:[^\s@]+@[^\s@]+\.[^\s@]+|(?=(?:\D*\d){7,15}\D*$)\+?[\d ()-]{7,25})$/)]],
    audience: ['', [Validators.required, Validators.pattern(/^(adult|youth|child)$/)]],
    gender: [{value: '', disabled: true}, [Validators.required, Validators.pattern(/^(woman|man)$/)]],
    age: [{value: '', disabled: true}, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    level: ['', Validators.required],
    availability: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(300)]],
    note: ['', Validators.maxLength(500)]
  });

  constructor() {
    this.form.controls.audience.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      const {gender, age} = this.form.controls;
      gender.reset('');
      age.reset('');
      if (value === 'adult') {
        gender.enable();
        age.disable();
      } else if (value === 'youth' || value === 'child') {
        gender.disable();
        age.enable();
      } else {
        gender.disable();
        age.disable();
      }
      this.checked = false;
    });
  }

  review(): void {
    this.form.markAllAsTouched();
    this.checked = true;
  }
}
