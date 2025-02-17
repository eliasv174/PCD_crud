import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartamentosService } from '../../services/departamentos.service';
import { PaisesService } from '../../services/paises.service';
import { MunicipiosService } from '../../services/municipios.service';


@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  departamentos: any[] = [];
  municipios: any[] = [];
  departamentoEditando: any = null;
  nombreEditado: string = '';
  paises: any[] = [];  // Lista de países
  paisIdSeleccionado: string = '';  // Almacena el paisId seleccionado
  departamentoIdSeleccionado: string = ''; // Almacena el departamento seleccionado
  nombreMunicipio: string = ''; // Almacena el nombre del nuevo municipio


  constructor(
    private departamentosService: DepartamentosService,
    private paisesService: PaisesService,
    private municipiosService: MunicipiosService   // Inyectar el servicio de países
  ) {}

  ngOnInit(): void {
    this.loadPaises();
    this.loadAllDepartamentos
  }

  loadPaises() {
    this.paisesService.getPaises().subscribe((data) => {
      this.paises = data;
    });
  }

  loadAllDepartamentos() {
    this.departamentosService.getAllDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }


  loadDepartamentos(paisId: string) {
    this.departamentosService.getDepartamentos(paisId).subscribe((data) => {
      this.departamentos = data;
    });
  }

  onPaisChange(paisId: string) {
    this.paisIdSeleccionado = paisId;  // Guardar el paisId seleccionado
    this.loadDepartamentos(paisId);  // Cargar los departamentos basados en el paisId
  }

  addDepartamento(nombre: string) {
    if (this.paisIdSeleccionado) {
      this.departamentosService.addDepartamento({ nombre, paisId: this.paisIdSeleccionado }).then(() => {
        this.loadDepartamentos(this.paisIdSeleccionado);  // Recargar los departamentos después de agregar
      });
    }
  }

  deleteDepartamento(id: string) {
    this.departamentosService.deleteDepartamento(id).then(() => {
      this.loadDepartamentos(this.paisIdSeleccionado);  // Recargar los departamentos después de eliminar
    });
  }

  editarDepartamento(departamento: any) {
    this.departamentoEditando = departamento;
    this.nombreEditado = departamento.nombre;
  }

  guardarEdicion() {
    if (this.departamentoEditando) {
      const departamentoActualizado = { ...this.departamentoEditando, nombre: this.nombreEditado };
      this.departamentosService.updateDepartamento(this.departamentoEditando.id, departamentoActualizado).then(() => {
        this.loadDepartamentos(this.paisIdSeleccionado);  // Recargar los departamentos después de editar
        this.departamentoEditando = null;  // Limpiar la variable de edición
      });
    }
  }

  cancelarEdicion() {
    this.departamentoEditando = null;
  }

  addMunicipio() {
    if (this.departamentoIdSeleccionado && this.nombreMunicipio) {
      this.municipiosService.addMunicipio({ nombre: this.nombreMunicipio, departamentoId: this.departamentoIdSeleccionado }).then(() => {
        this.municipiosService.getMunicipios(this.departamentoIdSeleccionado).subscribe((data) => {
          this.municipios = data; // Recargar los municipios después de agregar
        });
        this.nombreMunicipio = ''; // Limpiar el campo de entrada
      });
    }
}
}
