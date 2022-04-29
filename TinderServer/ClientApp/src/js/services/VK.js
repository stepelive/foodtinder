import bridge from "@vkontakte/vk-bridge";

import {store} from "../../index";

import {setColorScheme, setAccessToken} from "../store/vk/actions";

const APP_ID = 6984089;
const API_VERSION = '5.92';

export const initApp = () => (dispatch) => {
    const VKbridgeCallback = (e) => {
        if (e.detail.type === 'VKWebAppUpdateConfig') {
            bridge.unsubscribe(VKbridgeCallback);

            dispatch(setColorScheme(e.detail.data.scheme));
        }
    };

    bridge.subscribe(VKbridgeCallback);
    return bridge.send('VKWebAppInit', {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};
export const getUserData = () => (dispatch) => {
    const VKbridgeCallback = (e) => {
        if (e.detail.type === 'VKWebAppGetUserInfoResult') {
            bridge.unsubscribe(VKbridgeCallback);
            console.log(e);
            console.log('get user data')
        }
    };
    console.log('get user data')
    
    bridge.send('VKWebAppGetUserInfo')
        .then(data => {
            dispatch(setUserData(data));
            console.log(data);
            console.log('get user data')
        })
        .catch(error => {
            console.log(error)
        });
}
export const getAuthToken = (scope) => (dispatch) => {
    bridge.send("VKWebAppGetAuthToken", {
        "app_id": APP_ID,
        "scope": scope.join(',')
    }).then(data => {
        dispatch(setAccessToken(data.access_token));
    }).catch(() => {
        dispatch(setAccessToken(null));
    });
};

export const closeApp = () => {
    return bridge.send("VKWebAppClose", {
        "status": "success"
    }).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOn = () => {
    return bridge.send("VKWebAppEnableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOff = () => {
    return bridge.send("VKWebAppDisableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const groupsGet = () => {
    return APICall('groups.get', {
        "extended": "1",
        "fields": "description",
        "count": "100"
    });
};

export const APICall = (method, params) => {
    params['access_token'] = store.getState().vkui.accessToken;
    params['v'] = params['v'] === undefined ? API_VERSION : params['v'];

    return bridge.send("VKWebAppCallAPIMethod", {
        "method": method,
        "params": params
    }).then(data => {
        return data.response;
    }).catch(error => {
        return error;
    });
};
