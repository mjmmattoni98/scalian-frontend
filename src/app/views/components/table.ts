import { AfterViewInit, Component, effect, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CandidatesStore } from './candidates-store';

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
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule],
  template: `
    <table mat-table [dataSource]="candidates" matSort class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th
          mat-header-cell
          *matHeaderCellDef
          mat-sort-header
          sortActionDescription="Sort by name"
        >
          Name
        </th>
        <td mat-cell *matCellDef="let candidate">{{ candidate.name }}</td>
      </ng-container>

      <ng-container matColumnDef="surname">
        <th
          mat-header-cell
          *matHeaderCellDef
          mat-sort-header
          sortActionDescription="Sort by surname"
        >
          Surname
        </th>
        <td mat-cell *matCellDef="let candidate">{{ candidate.surname }}</td>
      </ng-container>

      <ng-container matColumnDef="seniority">
        <th
          mat-header-cell
          *matHeaderCellDef
          mat-sort-header
          sortActionDescription="Sort by seniority"
        >
          Seniority
        </th>
        <td mat-cell *matCellDef="let candidate">{{ candidate.seniority }}</td>
      </ng-container>

      <ng-container matColumnDef="years">
        <th
          mat-header-cell
          *matHeaderCellDef
          mat-sort-header
          sortActionDescription="Sort by years"
        >
          Years
        </th>
        <td mat-cell *matCellDef="let candidate">{{ candidate.years }}</td>
      </ng-container>

      <ng-container matColumnDef="availability">
        <th
          mat-header-cell
          *matHeaderCellDef
          mat-sort-header
          sortActionDescription="Sort by availability"
        >
          Availability
        </th>
        <td mat-cell *matCellDef="let candidate">
          {{ candidate.availability ? 'Available' : 'Not Available' }}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

    @if (candidates.data.length === 0) {
    <div class="empty-state" role="status" aria-live="polite">
      <mat-icon color="primary" fontIcon="info" aria-hidden="true"
        >info</mat-icon
      >
      <span>No candidates found. Upload candidates to get started.</span>
    </div>
    }

    <mat-paginator
      [pageSizeOptions]="[5, 10, 20]"
      showFirstLastButtons
      aria-label="Select page of candidates"
    />
  `,
  styles: `
    table { 
      width: 100%; 
      margin: 2rem auto; 
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 3rem 0 2rem 0;
      color: var(--quaternary-contrast, #888);
      font-size: 1.1rem;
      gap: 0.5rem;
    }
    th.mat-sort-header-sorted {
      color: black;
    }
  `,
})
export class Table implements AfterViewInit {
  displayedColumns = ['name', 'surname', 'seniority', 'years', 'availability'];
  candidates = new MatTableDataSource<Candidate>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.candidates.paginator = this.paginator;
    this.candidates.sort = this.sort;
  }

  constructor(public candidatesStore: CandidatesStore) {
    effect(() => {
      this.candidates.data = this.candidatesStore.candidates();
    });
  }
}
