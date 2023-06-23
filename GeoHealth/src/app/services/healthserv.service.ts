import { Injectable } from '@angular/core';
// import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc, docData, query, where } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { Services } from '../interfaces/services';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class HealthservService extends BaseServiceService {}
