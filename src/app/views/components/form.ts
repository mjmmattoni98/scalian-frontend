import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'candidates-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      style="max-width: 400px; margin: 2rem auto; display: flex; flex-direction: column; gap: 1rem;"
    >
      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" required />
        <mat-error
          *ngIf="form.get('name')?.invalid && form.get('name')?.touched"
          >Name is required</mat-error
        >
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Surname</mat-label>
        <input matInput formControlName="surname" required />
        <mat-error
          *ngIf="form.get('surname')?.invalid && form.get('surname')?.touched"
          >Valid surname is required</mat-error
        >
      </mat-form-field>
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="form.invalid"
      >
        Submit
      </button>
    </form>
    @if (submitted) {
    <p style="color: green;">
      Form submitted! Name: {{ form.value.name }}, Surname: {{ form.value.surname }}
    </p>
    }
  `,
  styles: ``,
})
export class Form {
  form: FormGroup;
  submitted = false;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
    }
  }
}
