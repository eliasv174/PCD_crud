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

  // Modificar este método para devolver un Observable
  getDepartamentos(paisId: string): Observable<DocumentData[]> {
    const departamentosRef = collection(this.firestore, 'departamentos');

    // Filtrar los departamentos por paisId
    const q = query(departamentosRef, where("paisId", "==", paisId));

    // Convertir el Promise a Observable con 'from'
    return from(getDocs(q)).pipe(
      // Extraer los datos de la consulta
      map((querySnapshot) => {
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      })
    );
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
