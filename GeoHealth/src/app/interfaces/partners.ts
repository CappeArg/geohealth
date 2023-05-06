import { GeoPoint } from "@angular/fire/firestore";
import { item } from "./item";

export interface Partners extends item {
    name:string;
    nameLowercase?:string;
    service: [];
    street: string,
    number: number,
    city: string,
    state: string,
    geo: GeoPoint
    email: string;
    phone: string;
    active: boolean;
}
