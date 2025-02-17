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
import { Observable, from } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  constructor(private firestore: Firestore
  ) {}

  getMunicipios(departamentoId: string): Observable<any[]> {
    const municipiosRef = collection(this.firestore, 'municipios');
    const q = query(municipiosRef, where('departamentoId', '==', departamentoId));
    return collectionData(q, { idField: 'id' });
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

