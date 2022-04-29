import {combineReducers} from "redux";
import {routerReducer} from './router/reducers';
import {vkuiReducer} from './vk/reducers';
import {cartReducer} from './cart/reducers';
import {productsReducer} from './products/reducers';

export default combineReducers({
    vkui: vkuiReducer,
    router: routerReducer,
    cart: cartReducer,
    products: productsReducer,
});