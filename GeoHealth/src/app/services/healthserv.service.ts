import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc, docData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Services } from '../interfaces/services';

@Injectable({
  providedIn: 'root'
})
export class HealthservService {

  constructor( private firestore:Firestore ) { }


  addService(service:Services){
    const serviceRef = collection(this.firestore,'services')

    return addDoc(serviceRef, service)
  }

  getServices():Observable<Services[]>{

    const serviceRef = collection(this.firestore,'services');
    return collectionData(serviceRef, {idField:'id'}) as Observable<Services[]> 
  }


  deleteService(service:Services){
    const serviceDocRef = doc(this.firestore,`services/${service.id}`);
    return deleteDoc(serviceDocRef)
  }

  getService(id: string) {
    const serviceDocRef = doc(this.firestore, `services/${id}`);
    return docData(serviceDocRef, { idField: 'id' });
  }

  updateService(service: Services) {
    const serviceDocRef = doc(this.firestore, `services/${service.id}`);
    return updateDoc(serviceDocRef, { ...service });
  }

  getServiceByName(searchValue: string): Observable<Services[]> {
    const partnerQuery = query( collection(this.firestore, 'services'),where('name', '==', searchValue));
    return collectionData(partnerQuery, { idField: 'id' }) as Observable<Services[]>;
  }
}
