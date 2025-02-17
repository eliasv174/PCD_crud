/*import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  constructor(private firestore: Firestore) {}

  getMunicipios() {
    const municipiosRef = collection(this.firestore, 'municipios');
    return collectionData(municipiosRef, { idField: 'id' });
  }

  addMunicipio(municipio: any) {
    const municipiosRef = collection(this.firestore, 'municipios');
    return addDoc(municipiosRef, municipio);
  }

  deleteMunicipio(id: string) {
    const municipioDocRef = doc(this.firestore, `municipios/${id}`);
    return deleteDoc(municipioDocRef);
  }

  updateMunicipio(id: string, municipio: any) {
    const municipioDocRef = doc(this.firestore, `municipios/${id}`);
    return updateDoc(municipioDocRef, municipio);
  }
}*/

import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, deleteDoc, updateDoc, addDoc,collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs'; // Importa 'from' de 'rxjs'
import { DocumentData } from 'firebase/firestore';
import { map } from 'rxjs/operators';  // map para transformar la respuesta


@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  constructor(private firestore: Firestore) {}

  // Obtener municipios por departamento
  getMunicipios(departamentoId: string): Observable<any[]> {
    const municipiosRef = collection(this.firestore, 'municipios');
    const q = query(municipiosRef, where("departamentoId", "==", departamentoId));

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      })
    );
  }

  // Agregar un nuevo municipio
  addMunicipio(municipio: any) {
    const municipiosRef = collection(this.firestore, 'municipios');
    return addDoc(municipiosRef, municipio);
  }

  deleteMunicipio(id: string) {
    const municipioDocRef = doc(this.firestore, `municipios/${id}`);
    return deleteDoc(municipioDocRef);
  }

  updateMunicipio(id: string, municipio: any) {
    const municipioDocRef = doc(this.firestore, `municipios/${id}`);
    return updateDoc(municipioDocRef, municipio);
  }

  getAllMunicipios() {
      const municipiosRef = collection(this.firestore, 'municipios');
      return collectionData(municipiosRef, { idField: 'id' });
    }

}

