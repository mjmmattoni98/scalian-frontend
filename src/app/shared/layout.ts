import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar color="primary" style="justify-content: center;">
      <span>Candidate Management</span>
    </mat-toolbar>
    <div style="min-height: 70vh; padding: 2rem;">
      <ng-content></ng-content>
    </div>
    <footer style="width: 100%; text-align: center; padding: 1rem 0; background: #f5f5f5; color: #666;">
      &copy; {{ year }} Santander Technical Test
    </footer>
  `
})
export class Layout {
  year = new Date().getFullYear();
}
