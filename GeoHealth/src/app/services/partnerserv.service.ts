import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, docData, updateDoc } from '@angular/fire/firestore';
import { Partners } from '../interfaces/partners';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerservService {

  constructor( private firestore:Firestore ) { }

  addPartner(partner:Partners){
    const partnerRef = collection(this.firestore,'partners')

    return addDoc(partnerRef, partner)
  }

  getPartners():Observable<Partners[]>{

    const serviceRef = collection(this.firestore,'partners');
    return collectionData(serviceRef, {idField:'id'}) as Observable<Partners[]> 
  }


  deletePartner(partner:Partners){
    const serviceDocRef = doc(this.firestore,`partners/${partner.id}`);
    return deleteDoc(serviceDocRef)
  }

  getPartner(id: string) {
    const partnerDocRef = doc(this.firestore, `partners/${id}`);
    return docData(partnerDocRef, { idField: 'id' });
  }

  updatePartner(partner: Partners) {
    const partnerDocRef = doc(this.firestore, `partners/${partner.id}`);
    return updateDoc(partnerDocRef, { ...partner });
  }
}
