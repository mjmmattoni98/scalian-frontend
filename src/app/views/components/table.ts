import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

interface Candidate {
  name: string;
  surname: string;
  seniority: string;
  years: number;
  availability: boolean;
}

@Component({
  selector: 'candidates-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  template: `
    <table mat-table [dataSource]="candidates" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let candidate">{{ candidate.name }}</td>
      </ng-container>
      <ng-container matColumnDef="surname">
        <th mat-header-cell *matHeaderCellDef>Surname</th>
        <td mat-cell *matCellDef="let candidate">{{ candidate.surname }}</td>
      </ng-container>
      <ng-container matColumnDef="seniority">
        <th mat-header-cell *matHeaderCellDef>Seniority</th>
        <td mat-cell *matCellDef="let candidate">{{ candidate.seniority }}</td>
      </ng-container>
      <ng-container matColumnDef="years">
        <th mat-header-cell *matHeaderCellDef>Years</th>
        <td mat-cell *matCellDef="let candidate">{{ candidate.years }}</td>
      </ng-container>
      <ng-container matColumnDef="availability">
        <th mat-header-cell *matHeaderCellDef>Availability</th>
        <td mat-cell *matCellDef="let candidate">
          {{ candidate.availability ? 'Available' : 'Not Available' }}
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

    <mat-paginator
      [pageSizeOptions]="[5, 10, 20]"
      showFirstLastButtons
      aria-label="Select page of periodic elements"
    />
  `,
  styles: `table { width: 100%; margin: 2rem auto; }`,
})
export class Table implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'surname', 'seniority', 'years', 'availability'];
  candidates = new MatTableDataSource<Candidate>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadCandidates();
    window.addEventListener('storage', () => this.loadCandidates());
    window.addEventListener('candidateAdded', () => this.loadCandidates());
  }

  ngAfterViewInit() {
    this.candidates.paginator = this.paginator;
  }

  loadCandidates() {
    const stored = localStorage.getItem('candidates');
    this.candidates.data = stored ? JSON.parse(stored) : [];
  }
}
