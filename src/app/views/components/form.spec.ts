import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { CandidateUploadService } from './candidate-upload';
import { CandidatesStore } from './candidates-store';
import { Form } from './form';
import { ToastService } from './toast';

class MockCandidateUploadService {
  uploadCandidate = jest
    .fn()
    .mockReturnValue(of({ name: 'John', surname: 'Doe' }));
}
class MockCandidatesStore {
  add = jest.fn();
}
class MockToastService {
  show = jest.fn();
}

describe('Form', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;
  let uploadService: MockCandidateUploadService;
  let candidatesStore: MockCandidatesStore;
  let toast: MockToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Form, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        {
          provide: CandidateUploadService,
          useClass: MockCandidateUploadService,
        },
        { provide: CandidatesStore, useClass: MockCandidatesStore },
        { provide: ToastService, useClass: MockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    uploadService = TestBed.inject(CandidateUploadService) as any;
    candidatesStore = TestBed.inject(CandidatesStore) as any;
    toast = TestBed.inject(ToastService) as any;
    fixture.detectChanges();
  });

  it('should disable submit button if form is invalid or no file', () => {
    component.selectedFile = null;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should show error if file is not selected on submit', () => {
    component.form.setValue({ name: 'John', surname: 'Doe' });
    component.selectedFile = null;
    component.onSubmit();
    expect(component.fileInputInvalid).toBe(true);
    expect(toast.show).not.toHaveBeenCalled();
  });

  it('should call upload service and reset form on valid submit', () => {
    component.form.setValue({ name: 'John', surname: 'Doe' });
    const file = new File([''], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    component.selectedFile = file;
    component.selectedFileName = file.name;
    fixture.detectChanges();
    component.onSubmit();
    expect(uploadService.uploadCandidate).toHaveBeenCalledWith(
      'John',
      'Doe',
      file
    );
    expect(candidatesStore.add).toHaveBeenCalled();
    expect(toast.show).toHaveBeenCalledWith(
      'Candidate John Doe loaded successfully!',
      4000,
      'success'
    );
    expect(component.form.value).toEqual({ name: null, surname: null });
    expect(component.selectedFile).toBeNull();
    expect(component.selectedFileName).toBe('');
  });

  it('should show error toast on upload failure', () => {
    uploadService.uploadCandidate.mockReturnValueOnce(
      throwError(() => ({ error: { message: 'Upload failed' } }))
    );
    component.form.setValue({ name: 'Jane', surname: 'Smith' });
    const file = new File([''], 'fail.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    component.selectedFile = file;
    component.selectedFileName = file.name;
    fixture.detectChanges();
    component.onSubmit();
    expect(toast.show).toHaveBeenCalledWith('Upload failed', 4000, 'error');
  });
});
