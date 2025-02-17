import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpresasService } from '../../services/empresas.service';

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
  correoEditado: string ='';
  departamentoEditado: string ='';
  municipioEditado: string ='';
  nitEditado: string ='';
  razonEditado: string ='';
  telefonoEditado: string ='';
  paisEditado: string ='';

  constructor(private empresasService : EmpresasService) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.empresasService.getEmpresas().subscribe((data) => {
      this.empresas = data;
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
        created: new Date(), // Fecha de creación
        updated: new Date(), // Fecha de actualización
        action: 'create', // Acción (puede ser 'create', 'update', etc.)
      };

      this.empresasService.addEmpresa(nuevaEmpresa).then(() => {
        this.loadEmpresas(); // Recargar la lista después de agregar
      });
    }

  deleteEmpresa(id: string) {
    this.empresasService.deleteEmpresa(id).then(() => {
      this.loadEmpresas(); // Recargar la lista después de eliminar
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
        const empresaActualizado = {
          ...this.empresaEditando,
          correoElectronico: this.correoEditado,
          departamento: this.departamentoEditado,
          municipio: this.municipioEditado,
          nit: this.nitEditado,
          nombreComercial: this.nombreComEditado,
          pais: this.paisEditado,
          razonSocial: this.razonEditado,
          telefono: this.telefonoEditado,
          updated: new Date(), // Actualiza la fecha de modificación
          action: 'update', // Cambia la acción a 'update'
        };

        this.empresasService.updateEmpresa(this.empresaEditando.id, empresaActualizado).then(() => {
          this.loadEmpresas(); // Recarga la lista después de editar
          this.empresaEditando = null; // Limpia la variable de edición
        });
      }
    }

  cancelarEdicion() {
    this.empresaEditando = null; // Cancela la edición
  }
}
