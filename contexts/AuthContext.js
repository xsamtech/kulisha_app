/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { API } from '../tools/constants';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const register = (firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password, role_id) => {
        setIsLoading(true);

        axios.post(`${API.url}/user`, {
            firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password, role_id
        }).then(res => {
            let message = res.data.message;
            let userData = res.data.data.user;

            setUserInfo(userData);

            AsyncStorage.setItem('userInfo', JSON.stringify(userData));
            ToastAndroid.show(`${message}`, ToastAndroid.LONG);

            console.log(`${message}`);
            setIsLoading(false);
        }).catch(e => {
            ToastAndroid.show(`${e}`, ToastAndroid.LONG);

            console.log(`Register error: ${e}`);
            setIsLoading(false);
        });
    };

    const login = (username, password) => {
        setIsLoading(true);

        axios.post(`${API.url}/user/login`, {
            username, password
        }).then(res => {
            // let success = res.data.sucess;
            let message = res.data.message;
            let userData = res.data.data;

            setUserInfo(userData);

            AsyncStorage.setItem('userInfo', JSON.stringify(userData));
            ToastAndroid.show(`${message}`, ToastAndroid.LONG);

            console.log(`${message}`);
            setIsLoading(false);
        }).catch(e => {
            ToastAndroid.show(`${e}`, ToastAndroid.LONG);

            console.log(`Login error: ${e}`);
            setIsLoading(false);
        });
    };

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }

            setSplashLoading(false);

        } catch (e) {
            ToastAndroid.show(`${e}`, ToastAndroid.LONG);

            console.log(`Login error: ${e}`);
            setSplashLoading(false);
        }
        setIsLoading(true);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
    };

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider
            value={{ isLoading, userInfo, splashLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}