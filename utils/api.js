import Moment from 'moment';

import Http from './http';

const getUTCNowDate = () => {
    let now = new Date();
    let dd = now.getUTCDate();
    let mm = now.getUTCMonth()+1;
    let yy = now.getUTCFullYear();

    let hh = now.getUTCHours();
    let min = now.getUTCMinutes();
    let ss = now.getUTCSeconds();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    }
    if(hh<10){
        hh='0'+hh;
    }
    if(min<10){
        min='0'+min;
    }
    if(ss<10){
        ss='0'+ss;
    }
    return [yy,mm,dd,hh,min,ss].join('');
}

export default class API {

    static signIn(user) {
        const result = Http.post('api/auth/login', user);
        return result;
    }

    static fetchUIInfo() {
        return Http.get('api/ui');
    }
    
    static fetchDaily() {
        const result = Http.get(`api/daily/state`);
        return result;
    }
    
    static updateDaily(dailyInfo) {
        const result = Http.post(`api/daily/mobile`, dailyInfo);
        return result;
    }
}