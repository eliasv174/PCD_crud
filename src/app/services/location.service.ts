import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los países
  obtenerPaises(): Observable<any[]> {
    return this.firestore.collection('paises').valueChanges({ idField: 'id' });
  }

  // Obtener departamentos por país
  obtenerDepartamentosPorPais(paisId: string): Observable<any[]> {
    return this.firestore
      .collection('departamento', (ref) => ref.where('pais', '==', this.firestore.doc(`paises/${paisId}`).ref))
      .valueChanges({ idField: 'id' });
  }

  // Obtener municipios por departamento
  obtenerMunicipiosPorDepartamento(departamentoId: string): Observable<any[]> {
    return this.firestore
      .collection('municipios', (ref) => ref.where('departamento', '==', this.firestore.doc(`departamento/${departamentoId}`).ref))
      .valueChanges({ idField: 'id' });
  }

  // Agregar un nuevo país
  agregarPais(nombre: string, cod: string) {
    return this.firestore.collection('paises').add({
      nombre,
      cod,
    });
  }

  // Agregar un nuevo departamento
  agregarDepartamento(nombre: string, paisId: string) {
    return this.firestore.collection('departamento').add({
      nombre,
      pais: this.firestore.doc(`paises/${paisId}`).ref, // Referencia al país
    });
  }

  // Agregar un nuevo municipio
  agregarMunicipio(nombre: string, departamentoId: string) {
    return this.firestore.collection('municipios').add({
      nombre,
      departamento: this.firestore.doc(`departamento/${departamentoId}`).ref, // Referencia al departamento
    });
  }
}
