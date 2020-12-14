import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "./Global";

export default class Token {

    static checkGenerateNewToken = async (callBack) => {

        var email = await AsyncStorage.getItem(Global.KEY_EMAIL);
        var password = await AsyncStorage.getItem(Global.KEY_PASSWORD);

        //   console.log("generate token.............", email, password)

        fetch(Global.URL_login, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            ),
        })
            .then((response) => response.json())
            .then(async (json) => {
                //console.log("response " + JSON.stringify(json));
                await AsyncStorage.setItem(Global.KEY_USER, JSON.stringify(json));
                callBack();

            })
            .catch((error) => console.error(error))
            .finally(() => {

            });
    }

}
