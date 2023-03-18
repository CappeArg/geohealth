import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
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

  updateService(service: Services) {
    const serviceDocRef = doc(this.firestore, `services/${service.id}`);
    return updateDoc(serviceDocRef, { ...service });
  }
}
