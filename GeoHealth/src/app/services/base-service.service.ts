import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, docData, where } from '@angular/fire/firestore';
import { addDoc, doc, query, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  constructor( protected firestore:Firestore ) { }


  add(i:any,collectionName:string){
    const ref = collection(this.firestore,collectionName)

    return addDoc(ref, i)
  }

  getAll(collectionName:string): Observable<[]>{

    const ref = collection(this.firestore,collectionName);
    return collectionData(ref, {idField:'id'}) as Observable<[]> 
  }


  delete(i:any, collectionName:string){
    const ref = doc(this.firestore,`${collectionName}/${i.id}`);
    return deleteDoc(ref)
  }

  get(id: string, collectionName:string) {
    const ref = doc(this.firestore, `${collectionName}/${id}`);
    return docData(ref, { idField: 'id' });
  }

  update(i: any, collectionName:string) {
    const ref = doc(this.firestore, `${collectionName}/${i.id}`);
    return updateDoc(ref, { ...i });
  }

  getItemByValueInArray( state:string,  searchValue:string, collectionName:string, field:string, field2:string ): Observable<[]>{
      if(state == ""){
        const ref = query( collection( this.firestore, collectionName ), where(field, 'array-contains', searchValue));
        return collectionData( ref, { idField: 'id' } ) as Observable<[]>;
      }
      else{
      const ref = query( collection(this.firestore, collectionName),where(field, 'array-contains', searchValue), where(field2, "==", state));
      return collectionData(ref, { idField: 'id' }) as Observable<[]>;
      }
  }
  
  getItemByValue(collectionName:string, field:string, searchValue:string){
    const ref = query( collection(this.firestore, collectionName), where(field, "==", searchValue));
    return collectionData(ref, { idField: 'id' }) as Observable<[]>;
  }

}

