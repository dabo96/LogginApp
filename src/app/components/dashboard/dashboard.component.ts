import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  nombre: string;
  position: number;
  desc: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, nombre: 'Hydrogen', desc: 1.0079},
  {position: 2, nombre: 'Helium', desc: 4.0026},
  {position: 3, nombre: 'Lithium', desc: 6.941},
  {position: 4, nombre: 'Beryllium', desc: 9.0122},
  {position: 5, nombre: 'Boron', desc: 10.811},
  {position: 6, nombre: 'Carbon', desc: 12.0107},
  {position: 7, nombre: 'Nitrogen', desc: 14.0067},
  {position: 8, nombre: 'Oxygen', desc: 15.9994},
  {position: 9, nombre: 'Fluorine', desc: 18.9984},
  {position: 10, nombre: 'Neon', desc: 20.1797},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  displayedColumns: string[] = ['position', 'nombre', 'desc'];
  dataSource = ELEMENT_DATA;
}
