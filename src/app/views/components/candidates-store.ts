import { Injectable, signal, computed } from '@angular/core';
import { CandidateUploadResponse } from './candidate-upload';

@Injectable({ providedIn: 'root' })
export class CandidatesStore {
  private readonly _candidates = signal<CandidateUploadResponse[]>(
    this.loadFromStorage()
  );

  readonly candidates = computed(() => this._candidates());

  constructor() {
    window.addEventListener('storage', () => {
      this._candidates.set(this.loadFromStorage());
    });
  }

  add(candidate: CandidateUploadResponse) {
    const updated = [...this._candidates(), candidate];
    this._candidates.set(updated);
    localStorage.setItem('candidates', JSON.stringify(updated));
  }

  private loadFromStorage(): CandidateUploadResponse[] {
    const stored = localStorage.getItem('candidates');
    return stored ? JSON.parse(stored) : [];
  }
}
