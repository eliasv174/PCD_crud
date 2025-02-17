import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpresasService } from '../../services/empresas.service';
import { PaisesService } from '../../services/paises.service';
import { MunicipiosService } from '../../services/municipios.service';
import { DepartamentosService } from '../../services/departamentos.service';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  empresas: any[] = [];
  empresaEditando: any = null;
  nombreComEditado: string = '';
  correoEditado: string = '';
  departamentoEditado: string = '';
  municipioEditado: string = '';
  nitEditado: string = '';
  razonEditado: string = '';
  telefonoEditado: string = '';
  paisEditado: string = '';
  paises: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];

  constructor(
    private empresasService: EmpresasService,
    private paisesService: PaisesService,
    private departamentosService: DepartamentosService,
    private municipiosService: MunicipiosService
  ) {}

  ngOnInit(): void {
    // Cargar empresas y países al inicio
    this.loadEmpresas();
    this.loadPaises();
  }

  loadEmpresas() {
    this.empresasService.getEmpresas().subscribe((data) => {
      this.empresas = data;
    });
  }

  loadPaises() {
    this.paisesService.getPaises().subscribe((paises) => {
      this.paises = paises;
    });
  }

  /*onPaisChange(paisId: string): void {
    // Al seleccionar un país, cargar los departamentos asociados
    this.departamentosService.getDepartamentos(paisId).subscribe((departamentos) => {
      this.departamentos = departamentos;
      this.municipios = []; // Limpiar municipios cuando se cambia de país
    });
  }

  onDepartamentoChange(departamentoId: string): void {
    // Al seleccionar un departamento, cargar los municipios asociados
    this.municipiosService.getMunicipios(departamentoId).subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  addEmpresa(
    correoElectronico: string,
    departamento: string,
    municipio: string,
    nit: string,
    nombreComercial: string,
    pais: string,
    razonSocial: string,
    telefono: string
  ) {
    const nuevaEmpresa = {
      correoElectronico,
      departamento,
      municipio,
      nit,
      nombreComercial,
      pais,
      razonSocial,
      telefono: Number(telefono),
      created: new Date(),
      updated: new Date(),
      action: 'create',
    };

    this.empresasService.addEmpresa(nuevaEmpresa).then(() => {
      this.loadEmpresas();
    });
  }*/

  deleteEmpresa(id: string) {
    this.empresasService.deleteEmpresa(id).then(() => {
      this.loadEmpresas();
    });
  }
  onPaisChange(paisId: string): void {
    // Buscar el país seleccionado por su id
    const paisSeleccionado = this.paises.find(pais => pais.id === paisId);
    if (paisSeleccionado) {
      this.paisEditado = paisSeleccionado.nombre;  // Guardar el nombre completo del país
    }

    this.departamentosService.getDepartamentos(paisId).subscribe((departamentos) => {
      this.departamentos = departamentos;
      this.municipios = []; // Limpiar municipios cuando se cambia de país
    });
  }

  onDepartamentoChange(departamentoId: string): void {
    // Buscar el departamento seleccionado por su id
    const departamentoSeleccionado = this.departamentos.find(departamento => departamento.id === departamentoId);
    if (departamentoSeleccionado) {
      this.departamentoEditado = departamentoSeleccionado.nombre;  // Guardar el nombre completo del departamento
    }

    this.municipiosService.getMunicipios(departamentoId).subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  onMunicipioChange(municipioId: string): void {
    // Buscar el municipio seleccionado por su id
    const municipioSeleccionado = this.municipios.find(municipio => municipio.id === municipioId);
    if (municipioSeleccionado) {
      this.municipioEditado = municipioSeleccionado.nombre;  // Guardar el nombre completo del municipio
    }
  }



  addEmpresa(
    correoElectronico: string,
    departamento: string,
    municipio: string,
    nit: string,
    nombreComercial: string,
    pais: string,
    razonSocial: string,
    telefono: string
  ) {
    const nuevaEmpresa = {
      correoElectronico,
      departamento: this.departamentoEditado,  // Usar el nombre del departamento
      municipio: this.municipioEditado,        // Usar el nombre del municipio
      nit,
      nombreComercial,
      pais: this.paisEditado,                  // Usar el nombre del país
      razonSocial,
      telefono: Number(telefono),
      created: new Date(),
      updated: new Date(),
      action: 'create',
    };

    this.empresasService.addEmpresa(nuevaEmpresa).then(() => {
      this.loadEmpresas();
    });
  }



  editarEmpresa(empresa: any) {
    this.empresaEditando = empresa;
    this.nombreComEditado = empresa.nombreComercial;
    this.correoEditado = empresa.correoElectronico;
    this.departamentoEditado = empresa.departamento;
    this.municipioEditado = empresa.municipio;
    this.nitEditado = empresa.nit;
    this.paisEditado = empresa.pais;
    this.razonEditado = empresa.razonSocial;
    this.telefonoEditado = empresa.telefono;
  }

  guardarEdicion() {
    if (this.empresaEditando) {
      const empresaActualizada = {
        ...this.empresaEditando,
        correoElectronico: this.correoEditado,
        departamento: this.departamentoEditado,
        municipio: this.municipioEditado,
        nit: this.nitEditado,
        nombreComercial: this.nombreComEditado,
        pais: this.paisEditado,
        razonSocial: this.razonEditado,
        telefono: this.telefonoEditado,
        updated: new Date(),
        action: 'update',
      };

      this.empresasService.updateEmpresa(this.empresaEditando.id, empresaActualizada).then(() => {
        this.loadEmpresas();
        this.empresaEditando = null;
      });
    }
  }

  cancelarEdicion() {
    this.empresaEditando = null;
  }
}

