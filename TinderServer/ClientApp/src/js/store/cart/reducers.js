import {
    ADD_PRODUCT
} from './actionTypes';


const initialState = {
    product: undefined
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT: {
            return {
                ...state,
                product: action.payload.product,
            };
        }
        default: {
            return state;
        }
    }
};
