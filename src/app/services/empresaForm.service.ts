/*import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpresasFormService {
  constructor(private firestore: Firestore) {}

  getEmpresasF() {
    const empresasRef = collection(this.firestore, 'empresas');
    return collectionData(empresasRef, { idField: 'id' });
  }

  addEmpresaF(empresa: any) {
    const empresaRef = collection(this.firestore, 'empresas');
    return addDoc(empresaRef, empresa);
  }

  deleteEmpresaF(id: string) {
    const empresaDocRef = doc(this.firestore, `empresas/${id}`);
    return deleteDoc(empresaDocRef);
  }

  updateEmpresaF(id: string, empresa: any) {
    const empresaDocRef = doc(this.firestore, `empresas/${id}`);
    return updateDoc(empresaDocRef, empresa);
  }
}*/
