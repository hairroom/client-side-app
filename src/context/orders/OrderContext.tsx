import { createContext } from 'react'
import { Order } from '../../interfaces/Order';

interface ContextProps {
    orders: Order[];

    addOrder: (name: string, lastName: string, phone: number, email: string, numberIdentification: string, typeIdentification: string, address: string, ) => Object;
}

{/* service: string, product: string, price: number, paymentMethod: string*/ }

export const OrderContext = createContext({} as ContextProps);
