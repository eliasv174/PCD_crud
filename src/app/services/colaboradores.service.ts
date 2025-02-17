import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {
  constructor(private firestore: Firestore) {}

  getColaboradores() {
    const colaboresRef = collection(this.firestore, 'colaboradores');
    return collectionData(colaboresRef, { idField: 'id' });
  }

  addColaborador(colaborador: any) {
    const colaboradorRef = collection(this.firestore, 'colaboradores');
    return addDoc(colaboradorRef, colaborador);
  }

  deleteColaborador(id: string) {
    const colaboradorDocRef = doc(this.firestore, `colaboradores/${id}`);
    return deleteDoc(colaboradorDocRef);
  }

  updateColaborador(id: string, colaborador: any) {
    const colaboradorDocRef = doc(this.firestore, `colaboradores/${id}`);
    return updateDoc(colaboradorDocRef, colaborador);
  }
}

