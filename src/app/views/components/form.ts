import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CandidateUploadService,
  CandidateUploadResponse,
} from './candidate-upload';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'candidates-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
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
      <input
        type="file"
        accept=".xlsx,.xls"
        (change)="onFileSelected($event)"
        [class.ng-invalid]="fileInputInvalid"
        required
        style="margin-bottom: 1rem;"
      />
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

  @Output() candidateAdded = new EventEmitter<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly uploadService: CandidateUploadService
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
      this.uploadService.uploadCandidate(name, surname, this.selectedFile).subscribe({
        next: (candidate: CandidateUploadResponse) => {
          // Store incrementally in localStorage
          const key = 'candidates';
          const stored = localStorage.getItem(key);
          let candidates: CandidateUploadResponse[] = stored ? JSON.parse(stored) : [];
          candidates.push(candidate);
          localStorage.setItem(key, JSON.stringify(candidates));
          this.candidateAdded.emit();
          window.dispatchEvent(new Event('candidateAdded'));
        },
        error: () => {
          // handle error (optional)
        }
      });
    } else if (!this.selectedFile) {
      this.fileInputInvalid = true;
      this.submitted = false;
    }
  }
}
