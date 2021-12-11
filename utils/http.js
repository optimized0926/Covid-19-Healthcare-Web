/* global fetch FormData ENDPOINT */
import StorageService from './StorageService';
import helper from './helper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENDPOINT} from '../utils/consts';

const getAuthorizationHeader = async () => {    
    const auth = await helper.getAuth();
    const AuthorizationHeader = auth ? `Bearer ${auth.token}` : '';
    return AuthorizationHeader;
};

// const token = "GUI3fLGXHIP0ZhgJpKincIGT3RcAjxTKlvBsfgkhS6fmGyaCWjwH8TxFCuEp";

// const getAuthorizationHeader = () => `Bearer ${token}`;

export default class Http {
    static async get(urlpath) {
        const url = ENDPOINT + urlpath;
        const AuthorizationHeader = await getAuthorizationHeader();

        let options = {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Accept": 'application/json',
                "Content-Type": "multipart/form-data",
                "Authorization": AuthorizationHeader
            },
        }
        return fetch(url, options).then((res) => res.json())
    }

    static async post(urlpath, data) {

        const url = ENDPOINT + urlpath;
        const AuthorizationHeader = await getAuthorizationHeader();
        

        let formappend = new FormData();
        for (let formdata in data) {
            formappend.append(formdata, data[formdata]);
        }
        let options = {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": AuthorizationHeader
                // "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(data)
        }
        return fetch(url, options).then((res) => res.json())
    }

    static async put(url, body) {
        const AuthorizationHeader = await getAuthorizationHeader();
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'put',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                "Authorization": AuthorizationHeader
            }
        });
        return response.json();
    }

    static async delete(url, body) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'delete',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                Authorization: getAuthorizationHeader()
            }
        });
        return response.json();
    }

}
