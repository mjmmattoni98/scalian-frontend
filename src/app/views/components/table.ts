import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

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
  imports: [MatTableModule],
  template: `
    <table mat-table [dataSource]="exampleCandidates" class="mat-elevation-z8">
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

    @if (!exampleCandidates.length) {
    <p>No candidates loaded yet.</p>
    }
  `,
  styles: `table { width: 100%; margin: 2rem auto; }`,
})
export class Table {
  displayedColumns = ['name', 'surname', 'seniority', 'years', 'availability'];
  exampleCandidates = [
    {
      name: 'John',
      surname: 'Doe',
      seniority: 'Mid',
      years: 5,
      availability: true,
    },
    {
      name: 'Jane',
      surname: 'Smith',
      seniority: 'Senior',
      years: 8,
      availability: false,
    },
    {
      name: 'Alice',
      surname: 'Johnson',
      seniority: 'Junior',
      years: 2,
      availability: true,
    },
  ];
}
