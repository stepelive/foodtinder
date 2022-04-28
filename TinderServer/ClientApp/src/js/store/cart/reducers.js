import {
    ADD_PRODUCT
} from './actionTypes';


const initialState = {
    products: []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT: {
            let products = state.products;
            products.push(action.payload);
            console.log(products);
            return {
                ...state,
                products: products,
            };
        }
        default: {
            return state;
        }
    }
};
