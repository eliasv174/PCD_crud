/*import { PaisesService } from './../../services/paises.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MunicipiosService } from '../../services/municipios.service';


@Component({
  selector: 'app-municipios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {
  municipios: any[] = [];
  municipioEditando: any = null; // Variable para almacenar el país que se está editando
  nombreEditado: string = '';

  constructor(private municipiosService: MunicipiosService) {}


  ngOnInit(): void {
    this.loadMunicipios();
  }

  loadMunicipios() {
    this.municipiosService.getMunicipios().subscribe((data) => {
      this.municipios = data;
    });
  }

  addMunicipio(nombre: string) {
    this.municipiosService.addMunicipio({ nombre }).then(() => {
      this.loadMunicipios(); // Recargar la lista después de agregar
    });
  }

  deleteMunicipio(id: string) {
    this.municipiosService.deleteMunicipio(id).then(() => {
      this.loadMunicipios(); // Recargar la lista después de eliminar
    });
  }
  editarMunicipio(municipio: any) {
    this.municipioEditando = municipio; // Almacena el país que se está editando
    this.nombreEditado = municipio.nombre; // Inicializa el nombre editado con el valor actual
  }

  guardarEdicion() {
    if (this.municipioEditando) {
      const municipioActualizado = { ...this.municipioEditando, nombre: this.nombreEditado };
      this.municipiosService.updateMunicipio(this.municipioEditando.id, municipioActualizado).then(() => {
        this.loadMunicipios(); // Recarga la lista después de editar
        this.municipioEditando = null; // Limpia la variable de edición
      });
    }
  }

  cancelarEdicion() {
    this.municipioEditando = null; // Cancela la edición
  }
}*/
/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MunicipiosService } from '../../services/municipios.service';
import { DepartamentosService } from '../../services/departamentos.service'; // Servicio para cargar los departamentos

@Component({
  selector: 'app-municipios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {
  municipios: any[] = [];
  municipioEditando: any = null;
  nombreEditado: string = '';
  departamentos: any[] = [];  // Lista de departamentos
  departamentoIdSeleccionado: string = '';  // Almacena el departamentoId seleccionado

  constructor(
    private municipiosService: MunicipiosService,
    private departamentosService: DepartamentosService,
    private PaisesService: PaisesService   // Inyectar el servicio de departamentos
  ) {}

  ngOnInit(): void {
    this.loadDepartamentos(); // Corregido: Llamar al método con paréntesis
    this.loadAllMunicipios(); // Corregido: Llamar al método con paréntesis
  }

  loadDepartamentos() {
    this.departamentosService.getAllDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  loadAllMunicipios() {
    this.municipiosService.getAllMunicipios().subscribe((data) => {
      this.municipios = data;
    });
  }

  loadMunicipios(departamentoId: string) {
    this.municipiosService.getMunicipios(departamentoId).subscribe((data) => {
      this.municipios = data;
    });
  }

  onDepartamentoChange(departamentoId: string) {
    this.departamentoIdSeleccionado = departamentoId;  // Guardar el departamentoId seleccionado
    this.loadMunicipios(departamentoId);  // Cargar los municipios basados en el departamentoId
  }

  addMunicipio(nombre: string) {
    if (this.departamentoIdSeleccionado) {
      this.municipiosService.addMunicipio({ nombre, departamentoId: this.departamentoIdSeleccionado }).then(() => {
        this.loadMunicipios(this.departamentoIdSeleccionado);  // Recargar los municipios después de agregar
      });
    }
  }

  deleteMunicipio(id: string) {
    this.municipiosService.deleteMunicipio(id).then(() => {
      this.loadMunicipios(this.departamentoIdSeleccionado);  // Recargar los municipios después de eliminar
    });
  }

  editarMunicipio(municipio: any) {
    this.municipioEditando = municipio;
    this.nombreEditado = municipio.nombre;
  }

  guardarEdicion() {
    if (this.municipioEditando) {
      const municipioActualizado = { ...this.municipioEditando, nombre: this.nombreEditado };
      this.municipiosService.updateMunicipio(this.municipioEditando.id, municipioActualizado).then(() => {
        this.loadMunicipios(this.departamentoIdSeleccionado);  // Recargar los municipios después de editar
        this.municipioEditando = null;  // Limpiar la variable de edición
      });
    }
  }

  cancelarEdicion() {
    this.municipioEditando = null;
  }
}*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MunicipiosService } from '../../services/municipios.service';
import { DepartamentosService } from '../../services/departamentos.service';
import { PaisesService } from '../../services/paises.service'; // Servicio para cargar los países

@Component({
  selector: 'app-municipios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {
  municipios: any[] = [];
  municipioEditando: any = null;
  nombreEditado: string = '';
  departamentos: any[] = [];  // Lista de departamentos
  paises: any[] = []; // Lista de países
  departamentoIdSeleccionado: string = '';  // Almacena el departamentoId seleccionado
  paisIdSeleccionado: string = ''; // Almacena el país seleccionado
  nombreMunicipio: string = ''; // Almacena el nombre del nuevo municipio

  constructor(
    private municipiosService: MunicipiosService,
    private departamentosService: DepartamentosService,
    private paisesService: PaisesService // Inyectar el servicio de países
  ) {}

  ngOnInit(): void {
    this.loadPaises(); // Cargar países al iniciar
    //this.loadAllMunicipios();
  }

  loadPaises() {
    this.paisesService.getPaises().subscribe((data) => {
      this.paises = data; // Asignar la lista de países
    });
  }

  loadDepartamentos() {
    if (this.paisIdSeleccionado) {
      this.departamentosService.getDepartamentos(this.paisIdSeleccionado).subscribe((data) => {
        this.departamentos = data; // Asignar la lista de departamentos según el país seleccionado
        this.municipios = []; // Limpiar la lista de municipios al cambiar de país
        this.departamentoIdSeleccionado = ''; // Resetear el departamento seleccionado
      });
    }
  }

  loadAllMunicipios() {
    this.municipiosService.getAllMunicipios().subscribe((data) => {
      this.municipios = data; // Asignar la lista de todos los municipios
    });
  }

  loadMunicipios(departamentoId: string) {
    this.municipiosService.getMunicipios(departamentoId).subscribe((data) => {
      this.municipios = data; // Cargar los municipios del departamento seleccionado
    });
  }

  onPaisChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Afirmar el tipo
    this.paisIdSeleccionado = selectElement.value; // Obtener el valor del select
    this.loadDepartamentos(); // Cargar departamentos basados en el país seleccionado
  }

  onDepartamentoChange(departamentoId: string) {
    this.departamentoIdSeleccionado = departamentoId; // Guardar el departamento seleccionado
    this.loadMunicipios(departamentoId); // Cargar municipios basados en el departamento seleccionado
  }

  addMunicipio() {
    if (this.departamentoIdSeleccionado && this.nombreMunicipio) {
      this.municipiosService.addMunicipio({ nombre: this.nombreMunicipio, departamentoId: this.departamentoIdSeleccionado }).then(() => {
        this.loadMunicipios(this.departamentoIdSeleccionado); // Recargar los municipios después de agregar
        this.nombreMunicipio = ''; // Limpiar el campo de entrada
      });
    }
  }

  deleteMunicipio(id: string) {
    this.municipiosService.deleteMunicipio(id).then(() => {
      this.loadMunicipios(this.departamentoIdSeleccionado); // Recargar los municipios después de eliminar
    });
  }

  editarMunicipio(municipio: any) {
    this.municipioEditando = municipio;
    this.nombreEditado = municipio.nombre;
  }

  guardarEdicion() {
    if (this.municipioEditando) {
      const municipioActualizado = { ...this.municipioEditando, nombre: this.nombreEditado };
      this.municipiosService.updateMunicipio(this.municipioEditando.id, municipioActualizado).then(() => {
        this.loadMunicipios(this.departamentoIdSeleccionado); // Recargar los municipios después de editar
        this.municipioEditando = null; // Limpiar la variable de edición
      });
    }
  }

  cancelarEdicion() {
    this.municipioEditando = null; // Cancelar la edición y limpiar la variable
    this.nombreEditado = ''; // Limpiar el campo de nombre editado
  }
}
