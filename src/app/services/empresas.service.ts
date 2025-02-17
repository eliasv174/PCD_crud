import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  constructor(private firestore: Firestore) {}

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

