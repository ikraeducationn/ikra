import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-uyelik-basvuru',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './uyelik-basvuru.component.html',
  styleUrls: ['../page-intro.css', './uyelik-basvuru.component.css']
})
export class UyelikBasvuruComponent {
  private readonly fb = inject(FormBuilder);
  checked = false;
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/\S.*\S/), Validators.maxLength(100)]],
    contact: ['', [Validators.required, Validators.pattern(/^(?:[^\s@]+@[^\s@]+\.[^\s@]+|(?=(?:\D*\d){7,15}\D*$)\+?[\d ()-]{7,25})$/)]],
    level: ['', Validators.required],
    elifba: ['', Validators.required],
    routine: ['', Validators.required],
    weekly: [false, Validators.requiredTrue],
    checkpoints: [false, Validators.requiredTrue],
    period: [false, Validators.requiredTrue],
    goal: ['', Validators.maxLength(500)]
  });

  review(): void {
    this.form.markAllAsTouched();
    this.checked = true;
  }
}
