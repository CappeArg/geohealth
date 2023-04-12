import { Services } from "./services";

export interface Partners {
    id?:string;
    name:string;
    service: any;
    street: string,
    number: number,
    city: string,
    state: string,
    lat?: number;
    lng?: number;
    email: string;
    phone: string;
    active: boolean;
}
