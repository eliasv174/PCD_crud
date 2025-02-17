import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-paises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {
  paises: any[] = [];
  paisEditando: any = null; // Variable para almacenar el país que se está editando
  nombreEditado: string = '';
  idEditado: string = '';

  constructor(private paisesService: PaisesService) {}

  /*ngOnInit(): void {
    this.paisesService.getPaises().subscribe((data) => {
      this.paises = data;
    });
  }

  addPais(nombre: string) {
    this.paisesService.addPais({ nombre }).then(() => {
      console.log('País agregado');
    });
  }

  deletePais(id: string) {
    this.paisesService.deletePais(id).then(() => {
      console.log('País eliminado');
    });
  }*/

  ngOnInit(): void {
    this.loadPaises();
  }

  loadPaises() {
    this.paisesService.getPaises().subscribe((data) => {
      this.paises = data;
    });
  }

  addPais(nombre: string, id:string) {
    this.paisesService.addPais({ nombre,id }).then(() => {
      this.loadPaises(); // Recargar la lista después de agregar
    });
  }

  deletePais(id: string) {
    this.paisesService.deletePais(id).then(() => {
      this.loadPaises(); // Recargar la lista después de eliminar
    });
  }
  editarPais(pais: any) {
    this.paisEditando = pais; // Almacena el país que se está editando
    this.nombreEditado = pais.nombre;
    this.idEditado = pais.id; // Inicializa el nombre editado con el valor actual
  }

  guardarEdicion() {
    if (this.paisEditando) {
      const paisActualizado = { ...this.paisEditando, nombre: this.nombreEditado,id: this.idEditado };
      this.paisesService.updatePais(this.paisEditando.id, paisActualizado).then(() => {
        this.loadPaises(); // Recarga la lista después de editar
        this.paisEditando = null; // Limpia la variable de edición
      });
    }
  }

  cancelarEdicion() {
    this.paisEditando = null; // Cancela la edición
  }
}
