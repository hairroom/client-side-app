export interface Order{
    name: string;
    lastName: string;
    phone: number;
    email: string;
    numberIdentification: string;
    typeIdentification: string;
    address: string;
    // service: string;
    // product: string;
    // price: number;
    // paymentMethod: string;
    createdAt?: number;
}