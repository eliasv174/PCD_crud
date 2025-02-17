/*import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  constructor(private firestore: Firestore) {}

  getDepartamentos() {
    const departamentosRef = collection(this.firestore, 'departamentos');
    return collectionData(departamentosRef, { idField: 'id' });
  }

  addDepartamento(departamento: any) {
    const departamentosRef = collection(this.firestore, 'departamentos');
    return addDoc(departamentosRef, departamento);
  }

  deleteDepartamento(id: string) {
    const departamentoDocRef = doc(this.firestore, `departamentos/${id}`);
    return deleteDoc(departamentoDocRef);
  }

  updateDepartamento(id: string, departamento: any) {
    const departamentoDocRef = doc(this.firestore, `departamentos/${id}`);
    return updateDoc(departamentoDocRef, departamento);
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
export class DepartamentosService {
  constructor(private firestore: Firestore) {}




  getDepartamentos(paisId: string): Observable<any[]> {
    const departamentosRef = collection(this.firestore, 'departamentos');
    const q = query(departamentosRef, where('paisId', '==', paisId));
    return collectionData(q, { idField: 'id' });
  }

  addDepartamento(departamento: any) {
    const departamentosRef = collection(this.firestore, 'departamentos');
    return addDoc(departamentosRef, departamento);
  }

  deleteDepartamento(id: string) {
    const departamentoDocRef = doc(this.firestore, `departamentos/${id}`);
    return deleteDoc(departamentoDocRef);
  }

  updateDepartamento(id: string, departamento: any) {
    const departamentoDocRef = doc(this.firestore, `departamentos/${id}`);
    return updateDoc(departamentoDocRef, departamento);
  }

  getAllDepartamentos() {
      const departamentosRef = collection(this.firestore, 'departamentos');
      return collectionData(departamentosRef, { idField: 'id' });
    }

}
