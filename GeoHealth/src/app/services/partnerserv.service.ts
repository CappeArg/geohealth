import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, docData, updateDoc, query, where } from '@angular/fire/firestore';
import { Partners } from '../interfaces/partners';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerservService {

  constructor( private firestore:Firestore ) { }

  addPartner(partner:Partners){

    const partnerRef = collection(this.firestore,'partners')
  
    partner.nameLowercase = partner.name.toLowerCase();
    return addDoc(partnerRef, partner)
  }

  getPartners():Observable<Partners[]>{

    const partnerRef = collection(this.firestore,'partners');
    return collectionData(partnerRef, {idField:'id'}) as Observable<Partners[]> 
  }


  deletePartner(partner:Partners){
    const partnerDocRef = doc(this.firestore,`partners/${partner.id}`);
    return deleteDoc(partnerDocRef)
  }

  getPartner(id: string) {
    const partnerDocRef = doc(this.firestore, `partners/${id}`);
    return docData(partnerDocRef, { idField: 'id' });
  }

  updatePartner(partner: Partners) {
    const partnerDocRef = doc(this.firestore, `partners/${partner.id}`);
    partner.nameLowercase = partner.name.toLowerCase();
    return updateDoc(partnerDocRef, { ...partner });
  }

    // getPartnersByName(searchValue: string): Observable<Partners[]> {
    //   const partnerQuery = query( collection(this.firestore, 'partners'),where('nameLowercase', '>=', searchValue.toLowerCase()),
    //   where('nameLowercase', '<=', searchValue.toLowerCase() + '.*'));
    //   return collectionData(partnerQuery, { idField: 'id' }) as Observable<Partners[]>;
    // }
    
  getPartnerByService(state:string, searchValue: string): Observable<Partners[]> {
    if(state == ""){
      const partnerQuery = query( collection(this.firestore, 'partners'),where('service', 'array-contains', searchValue));
      return collectionData(partnerQuery, { idField: 'id' }) as Observable<Partners[]>;
    }
    else{
    const partnerQuery = query( collection(this.firestore, 'partners'),where('service', 'array-contains', searchValue), where('state', "==", state));
    return collectionData(partnerQuery, { idField: 'id' }) as Observable<Partners[]>;
    }
  }

  getPartnerByState(state:string){
    const partnerQuery = query( collection(this.firestore, 'partners'), where('state', "==", state));
    return collectionData(partnerQuery, { idField: 'id' }) as Observable<Partners[]>;
      
  }
}
