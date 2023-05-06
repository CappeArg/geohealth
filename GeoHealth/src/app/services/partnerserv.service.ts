import { Injectable } from '@angular/core';
import { collection, collectionData, query, where } from '@angular/fire/firestore';
import { Partners } from '../interfaces/partners';
import { Observable } from 'rxjs';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerservService extends BaseServiceService {

    
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
