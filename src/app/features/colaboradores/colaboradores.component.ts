import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColaboradoresService } from '../../services/colaboradores.service';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: any[] = [];
  colaboradorEditando: any = null;
  empresaEditado: string = '';
  nombresEditado: string ='';
  apellidosEditado: string ='';
  edadEditado: string ='';
  telefonoEditado: string ='';
  correoEditado: string ='';

  constructor(private colaboradoresService : ColaboradoresService) {}

  ngOnInit(): void {
    this.loadColaboradores();
  }

  loadColaboradores() {
    this.colaboradoresService.getColaboradores().subscribe((data) => {
      this.colaboradores = data;
    });
  }

    addColaborador(
      empresa: string,
      nombres: string,
      apellidos: string,
      edad: string,
      telefono: string,
      correoElectronico: string,

    ) {
      const nuevoColaborador = {

        empresa,
        nombres,
        apellidos,
        edad,
        correoElectronico,
        telefono: Number(telefono),
        created: new Date(), // Fecha de creación
        updated: new Date(), // Fecha de actualización
        action: 'create', // Acción (puede ser 'create', 'update', etc.)
      };

      this.colaboradoresService.addColaborador(nuevoColaborador).then(() => {
        this.loadColaboradores(); // Recargar la lista después de agregar
      });
    }

  deleteColaborador(id: string) {
    this.colaboradoresService.deleteColaborador(id).then(() => {
      this.loadColaboradores(); // Recargar la lista después de eliminar
    });
  }
  editarColaborador(colaborador: any) {
    this.colaboradorEditando = colaborador;
    this.empresaEditado = colaborador.empresa;
    this.nombresEditado = colaborador.nombres;
    this.apellidosEditado = colaborador.apellidos;
    this.edadEditado = colaborador.edad;
    this.telefonoEditado = colaborador.telefono;
    this.correoEditado = colaborador.correoElectronico;
  }
    guardarEdicion() {
      if (this.colaboradorEditando) {
        const colaboradorActualizado = {
          ...this.colaboradorEditando,
          empresa: this.empresaEditado,
          nombres: this.nombresEditado,
          apllidos: this.apellidosEditado,
          edad: this.edadEditado,
          telefono: this.telefonoEditado,
          correoElectronico: this.correoEditado,
          updated: new Date(), // Actualiza la fecha de modificación
          action: 'update', // Cambia la acción a 'update'
        };

        this.colaboradoresService.updateColaborador(this.colaboradorEditando.id, colaboradorActualizado).then(() => {
          this.loadColaboradores(); // Recarga la lista después de editar
          this.colaboradorEditando = null; // Limpia la variable de edición
        });
      }
    }

  cancelarEdicion() {
    this.colaboradorEditando = null; // Cancela la edición
  }
}
