import { Component } from '@angular/core';
import { Form } from './components/form';
import { Table } from './components/table';
import { Layout } from '../shared/layout';

@Component({
  selector: 'app-candidates',
  imports: [Form, Table, Layout],
  template: `
    <app-layout>
      <candidates-form />
      <candidates-table />
    </app-layout>
  `,
  styles: ``
})
export class Candidates {

}
