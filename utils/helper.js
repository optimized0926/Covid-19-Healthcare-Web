// F1 API v6
import AsyncStorage from '@react-native-async-storage/async-storage';

let helper = {
  async getAuth(){
        try {
            let jsonStr = await AsyncStorage.getItem('auth');
            const auth = JSON.parse(jsonStr);
            return auth;
        } catch (e) {
            //error while parsing local storage
            return null;
        }
    },
    async setAuth(data){
        await AsyncStorage.setItem('auth', JSON.stringify(data))
    }  
}

module.exports = helper
