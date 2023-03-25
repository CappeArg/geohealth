import { Services } from "./services";

export interface Partners {
    id?:string;
    name:string;
    services: Services[];
    location: {
        street: string,
        number: number,
        city: string,
        state: string
    };
    contactData: {
        email: string;
        phone: string;
    }
    active: boolean;
}
