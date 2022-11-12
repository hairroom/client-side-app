import { FC, useContext, useEffect, useReducer } from 'react';
import { Order } from '../../interfaces/Order';
import { OrderContext, orderReducer } from './';
import authApi from '../../api/authApi';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../auth';
import ordersApi from '../../api/ordersApi';

export interface OrdersState{
    orders: Order[];
    order: Order;
}

export const ORDERS_INITIAL_STATE: OrdersState = {
    orders: [],
    order: {
        name: '',
        lastName: '',
        phone: 0,
        email: '',
        numberIdentification: '',
        typeIdentification: '',
        address: '',
        createdAt: 0
    }
}

export const OrderProvider: React.FC<any> = ({ children }) => {

    const [ state, dispatch ] = useReducer(orderReducer, ORDERS_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useContext(AuthContext);

    const addOrder = async ( name: string,
        lastName: string,
        phone: number,
        email: string,
        numberIdentification: string,
        typeIdentification: string,
        address: string,
         ) => {
            // {service: string,
            //     product: string,
            //     price: number,
            //     paymentMethod: string,}
        

        const { data } = await ordersApi.post<Order>('/createOrder', { name, lastName, phone, email, numberIdentification, typeIdentification, address });
        dispatch({ type: 'Orders - AddNewOrder', payload: data })

        enqueueSnackbar('Órden agregada correctamente!', {
            variant: 'success',
            autoHideDuration: 4000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        });

        return data;
    }

    const filterPerson = async (typeIdentification: string, numberIdentification: string) => {

        const { data } = await ordersApi.post<Order>('/filterOrderByIdentification', { typeIdentification, numberIdentification });

        dispatch({ type: 'Orders - SearchPerson', payload: data })
        return data;
    }
    

    return (
        <OrderContext.Provider value={{
            ...state,

            //Methods
            addOrder,
            filterPerson
        }}>
            { children }
        </OrderContext.Provider>
    )
}