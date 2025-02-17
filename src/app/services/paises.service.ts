import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDocs } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  constructor(private firestore: Firestore) {}

  getAllPaises() {
    const paisesRef = collection(this.firestore, 'paises');
    return collectionData(paisesRef, { idField: 'id' });
  }

  addPais(pais: any) {
    const paisesRef = collection(this.firestore, 'paises');
    return addDoc(paisesRef, pais);
  }

  deletePais(id: string) {
    const paisDocRef = doc(this.firestore, `paises/${id}`);
    return deleteDoc(paisDocRef);
  }

  updatePais(id: string, pais: any) {
    const paisDocRef = doc(this.firestore, `paises/${id}`);
    return updateDoc(paisDocRef, pais);
  }
  getPaises(): Observable<any[]> {
    const paisesRef = collection(this.firestore, 'paises'); // Asegúrate de que 'paises' sea el nombre correcto de tu colección
    return from(getDocs(paisesRef)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      })
    );
  }
}
