import API from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestSignIn = (user) => {
    return function(dispatch) {
        return API.signIn(user).then(
          async (result) => {
                console.log(result);
                if (result.message == "User not registered")
                {
                    dispatch(signInError(result.message))
                    return;
                }
                let authInfo = result;                
                await AsyncStorage.setItem('auth', JSON.stringify(result))
                dispatch(signInSuccess(authInfo))
            },
          (error) => dispatch(signInError(error))
        );
    };
};

export const requestTodayDaily = () => {
    return function(dispatch) {
        dispatch(setLoading(true))
        return API.fetchDaily().then(
          async (res) => {              
                dispatch(setLoading(false))
                const daily = res;
                if (daily == null)
                    return;
                const inputData = { attend: daily.attend, tempLess: daily.temp, noSymptoms: daily.symptoms, exposure: daily.exposure };
                dispatch(setDaily(inputData))
            },
          (error) => {dispatch(setLoading(false))}
        );
    };
}

export const setDaily = (daily) => {
    return { type: 'SET_DAILY', payload: daily };
}

export const setLoading = (value) => {
    return { type: 'SET_LOADING', payload: value};
}

export const signInSuccess = (authInfo) => {

    return { type: 'SIGN_IN_SUCCESS',  payload: authInfo };
};

export const signInError = (error) => {
    return { type: 'SIGN_IN_ERROR',  error: error };
};

export const requestUpdate = (dailyInfo) => {
    return function(dispatch) {
        dispatch(setLoading(true))
        return API.updateDaily(dailyInfo).then(
          (result) => {           
                dispatch(setLoading(false))
                dispatch(setDaily(dailyInfo));
                dispatch(updateSuccess(dailyInfo))
            },
          (error) => {              
            dispatch(setLoading(false))
            dispatch(updateError(error))
          }
        );
    };

    
};

export const updateSuccess = (dailyInfo) => {
    let uiTextInfo = {};

    return { type: 'UPDATE_SUCCESS',  status: {noSymptoms: dailyInfo.noSymptoms?true:false, tempLess: dailyInfo.tempLess?true:false} };
};

export const updateError = (error) => {
    return { type: 'UPDATE_ERROR',  error: error };
};

 