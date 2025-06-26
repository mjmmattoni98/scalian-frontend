import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'custom-toast',
  standalone: true,
  template: `
    <div
      class="toast-content"
      [class.success]="data.type === 'success'"
      [class.error]="data.type === 'error'"
    >
      <span class="icon">
        @if (data.type === 'success') {✔️} @if (data.type === 'error') {❌}
      </span>
      <span>{{ data.message }}</span>
    </div>
  `,
  styles: `
    .toast-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
      color: #fff;
      padding: 0.5rem 1.5rem;
      border-radius: 4px;
    }
    .toast-content.success {
      background: #43a047;
    }
    .toast-content.error {
      background: #e53935;
    }
    .icon {
      font-size: 1.3rem;
      display: flex;
      align-items: center;
    }
  `,
})
export class CustomToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; type: 'success' | 'error' }
  ) {}
}
