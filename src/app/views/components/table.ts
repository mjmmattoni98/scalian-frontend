import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
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
    
    th.mat-sort-header-sorted {
      color: black;
    }
  `,
})
export class Table implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['name', 'surname', 'seniority', 'years', 'availability'];
  candidates = new MatTableDataSource<Candidate>([]);

  ngOnInit() {
    this.loadCandidates();
    window.addEventListener('storage', () => this.loadCandidates());
    window.addEventListener('candidateAdded', () => this.loadCandidates());
  }

  ngAfterViewInit() {
    this.candidates.paginator = this.paginator;
    this.candidates.sort = this.sort;
  }

  loadCandidates() {
    const stored = localStorage.getItem('candidates');
    this.candidates.data = stored ? JSON.parse(stored) : [];
  }
}
