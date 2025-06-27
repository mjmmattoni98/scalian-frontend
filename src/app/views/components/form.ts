import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  CandidateUploadResponse,
  CandidateUploadService,
} from './candidate-upload';
import { CandidatesStore } from './candidates-store';
import { ToastService } from './toast';

@Component({
  selector: 'candidates-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
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
        @if (form.get('name')?.invalid && form.get('name')?.touched) {
        <mat-error>Name is required</mat-error>
        }
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Surname</mat-label>
        <input matInput formControlName="surname" required />
        @if (form.get('surname')?.invalid && form.get('surname')?.touched) {
        <mat-error>Valid surname is required</mat-error>
        }
      </mat-form-field>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button
          mat-stroked-button
          color="primary"
          type="button"
          (click)="fileInput.click()"
        >
          <mat-icon>upload_file</mat-icon>
          {{ selectedFileName || 'Choose Excel file...' }}
        </button>
        <input
          #fileInput
          type="file"
          accept=".xlsx,.xls"
          (change)="onFileSelected($event)"
          style="display:none;"
        />
      </div>
      @if (fileInputInvalid) {
      <mat-error>Please select an Excel file.</mat-error>
      }
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="form.invalid || !selectedFile"
      >
        Submit
      </button>
    </form>
  `,
  styles: ``,
})
export class Form {
  form: FormGroup;
  submitted = false;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  fileInputInvalid = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly uploadService: CandidateUploadService,
    private readonly toast: ToastService,
    private readonly candidatesStore: CandidatesStore
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', [Validators.required]],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name.toLowerCase();
      const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
      if (isExcel) {
        this.selectedFile = file;
        this.selectedFileName = file.name;
        this.fileInputInvalid = false;
      } else {
        this.selectedFile = null;
        this.selectedFileName = '';
        this.fileInputInvalid = true;
      }
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
      this.fileInputInvalid = true;
    }
  }

  onSubmit() {
    if (this.form.valid && this.selectedFile) {
      this.submitted = true;
      this.fileInputInvalid = false;
      const { name, surname } = this.form.value;
      this.uploadService
        .uploadCandidate(name, surname, this.selectedFile)
        .pipe(
          tap((candidate: CandidateUploadResponse) => {
            this.candidatesStore.add(candidate);
            this.toast.show(
              `Candidate ${candidate.name} ${candidate.surname} loaded successfully!`,
              4000,
              'success'
            );
          }),
          catchError((err) => {
            const msg = err?.error?.message ?? 'Upload failed';
            this.toast.show(msg, 4000, 'error');
            return of();
          })
        )
        .subscribe();
    } else if (!this.selectedFile) {
      this.fileInputInvalid = true;
      this.submitted = false;
    }
  }
}
