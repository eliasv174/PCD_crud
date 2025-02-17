import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDocs } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  constructor(private firestore: Firestore) {}

  getAEmpresas(): Observable<any[]> {
      const empresasRef = collection(this.firestore, 'empresas');
      return from(getDocs(empresasRef)).pipe(
        map((querySnapshot) => {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        })
      );
    }

  getEmpresas() {
    const empresasRef = collection(this.firestore, 'empresas');
    return collectionData(empresasRef, { idField: 'id' });
  }

  addEmpresa(empresa: any) {
    const empresaRef = collection(this.firestore, 'empresas');
    return addDoc(empresaRef, empresa);
  }

  deleteEmpresa(id: string) {
    const empresaDocRef = doc(this.firestore, `empresas/${id}`);
    return deleteDoc(empresaDocRef);
  }

  updateEmpresa(id: string, empresa: any) {
    const empresaDocRef = doc(this.firestore, `empresas/${id}`);
    return updateDoc(empresaDocRef, empresa);
  }
}

