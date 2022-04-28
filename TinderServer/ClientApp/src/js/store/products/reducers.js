import {ADD_PRODUCTS, SET_PRODUCTS, INCREMENT_OFFSET} from './actionTypes';



const initialState = {
    products: [],
    offset:0
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS: {
            let currentProducts = state.products;
            currentProducts.concat(action.payload);
            console.log(`CurrentProd: ${currentProducts}`)
            
            return {
                ...state,
                products:currentProducts,
            };
        }
        case SET_PRODUCTS: {
            return {
                ...state,
                products: action.payload,
            };
        }
        case INCREMENT_OFFSET: {
            return {
                ...state,
                offset: state.offset + 16,
            };
        }
        default: {
            return state;
        }
    }
};
