import {ADD_PRODUCTS, SET_PRODUCTS, INCREMENT_OFFSET} from './actionTypes';

export const addProduct = (product) => (
    {
        type: ADD_PRODUCTS,
        payload: product,
        
    }
);

export const setProducts = (products) => (
    {
        type: SET_PRODUCTS,
        payload:  products,
        
    }
);

export const incrementOffset = () => (
    {
        type: INCREMENT_OFFSET
    }
);