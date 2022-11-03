import { OrdersState } from './';
import { Order } from '../../interfaces/Order';

type OrderActionTypes = 
|   { type: 'Orders - AddNewOrder', payload: Order }
|   { type: 'Orders - UpdateNewOrder', payload: Order }
|   { type: 'Orders - DeleteNewOrder', payload: Order }
|   { type: 'Orders - RefreshData', payload: Order[] }
|   { type: 'Orders - SearchPerson', payload: Order }

export const orderReducer = ( state: OrdersState, action: OrderActionTypes ): OrdersState => {

    switch( action.type ){
       case 'Orders - RefreshData':
            console.log('PAYLOAD: ', action.payload)
           return {
               ...state,
               orders: [ ...action.payload ]
           }

        case 'Orders - AddNewOrder': 
           return {    
            ...state,
            orders: [ ...state.orders, action.payload ]
           }

        case 'Orders - SearchPerson':
            console.log('ACTION PAYLOAD PERSONA: ', action.payload);
            
            return {
                ...state,
                order: action.payload
            }

       default:
           return state;
    }

}