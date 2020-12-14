
import React, { useState, useEffect, Component, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Animated,
    StatusBar
} from 'react-native';
import Global from '../utils/Global';

import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({ navigation }) => {

    const fadeAnim = useRef(new Animated.Value(1)).current

    useEffect(() => {
        setTimeout(() => {
            checkLogin();
        }, 2000);
        anim();
    }, []);

    const checkLogin = async () => {

        var isLogin = await AsyncStorage.getItem(Global.KEY_ISLOGIN);
        if (isLogin == "true") {

            var user = await AsyncStorage.getItem(Global.KEY_USER);
            var userJson = JSON.parse(user);

            navigation.replace("HomeScreen", {
                initScreen: userJson.roles[0] == "Patient" ? "SearchDoctors" : "DocDashboard"
            });
        } else {
            navigation.replace("LoginScreen");
        }
    }

    const anim = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }

    return (
        <SafeAreaView style={styles.view}>
            <StatusBar barStyle="dark-content" hidden={true} backgroundColor="#FFF" />
            <Animated.Image style={{
                alignItems: "center",
                transform: [
                    {
                        translateX: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-600, 0]
                        })
                    }
                ]
            }, styles.image}
                resizeMode="contain"
                source={require('../images/logo.png')} />

        </SafeAreaView>
    );
}
export default SplashScreen;
const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
        margin: 10,
    },
    view: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#FFF"
    },
    backgroundtext: {
        opacity: 0.1,
        fontSize: 16,
    }
});