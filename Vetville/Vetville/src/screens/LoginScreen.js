import React, { useState, useEffect, Component, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Animated,
    StatusBar, View, Text, ScrollView, TouchableWithoutFeedback, Alert
} from 'react-native';


import Global from '../utils/Global';
import Header from '../Components/Header';
import { Button, Card, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from "react-native-modal-loader";
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const [email, setEmail] = useState("patient@accepire.co");
    // const [password, setPassword] = useState("Patient@12345");
    
    // const [email, setEmail] = useState("doctor@accepire.co");
    // const [password, setPassword] = useState("Doctor@12345");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

    }, []);


    const formValidate = () => {

        let reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email == "") {
            alert("Enter Email");
        }
        else if (!reg_email.test(email)) {
            alert("Enter Valid a Email");
        }
        else if (password == "") {
            alert("Enter Password");
        }
        else {
            checkLogin();
        }
    }


    const checkLogin = () => {

        setIsLoading(true);

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
            .then((json) => {
                //console.log("response " + JSON.stringify(json));
                checkLoginResponse(json);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setIsLoading(false);
            });
    }

    const checkLoginResponse = async (json) => {
        console.log(json.roles[0]);

        if (json.errorMessages == undefined) {

            await AsyncStorage.setItem(Global.KEY_ISLOGIN, "true");
            await AsyncStorage.setItem(Global.KEY_USER_TOKEN, json.token);
            await AsyncStorage.setItem(Global.KEY_USER_ROLES, json.roles[0]);
            await AsyncStorage.setItem(Global.KEY_USER, JSON.stringify(json));
            await AsyncStorage.setItem(Global.KEY_EMAIL, email);
            await AsyncStorage.setItem(Global.KEY_PASSWORD, password);

            navigation.replace("HomeScreen", {
                initScreen: json.roles[0] == "Patient" ? "SearchDoctors" : "DocDashboard"
            });

        } else {
            alert(json.errorMessages);
        }
    }

    return (
        <View style={styles.view}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor={Global.primaryColor} translucent={false} />
            <Header />

            <Loader loading={isLoading} color={Global.primaryColor} />

            <ScrollView style={{ paddingTop: "8%" }} keyboardShouldPersistTaps="always">
                <Card style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 8, paddingVertical: 12, paddingHorizontal: 8 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login Vetville</Text>
                    </View>

                    <TextInput
                        label="Email"
                        value={email}
                        mode="outlined"
                        underlineColor="#000"
                        textContentType="username"
                        theme={{ colors: { primary: Global.primaryColor } }}
                        style={{ height: 52, marginTop: 16 }}
                        onChangeText={text => { setEmail(text) }}
                    />

                    <TextInput
                        label="Password"
                        textContentType="password"
                        value={password}
                        secureTextEntry={true}
                        mode="outlined"
                        underlineColor="#000"
                        theme={{ colors: { primary: Global.primaryColor } }}
                        style={{ height: 52, marginTop: 8 }}
                        onChangeText={text => { setPassword(text) }}
                    />

                    <View style={{ marginTop: 16, alignItems: "flex-end" }} >
                        <TouchableOpacity
                            onPress={() => { Alert.alert("Forgot Password ?") }}>
                            <Text style={{ fontSize: 14 }}>Forgot Password ? </Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        style={{ marginTop: 16 }}
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        color={Global.buttonColor1}
                        onPress={() => formValidate()}>
                        <Text style={{ fontSize: 18 }}>Login</Text>
                    </Button>


                    <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center", justifyContent: "space-around" }}>
                        <View style={{ width: "44%", height: 1, backgroundColor: "#D3D3D3" }} />
                        <Text style={{ color: "#D3D3D3" }}>or</Text>
                        <View style={{ width: "44%", height: 1, backgroundColor: "#D3D3D3" }} />
                    </View>

                    <View style={{ marginTop: 16, flexDirection: "row", justifyContent: "space-evenly" }}>

                        <Button
                            style={{ width: "48%" }}
                            icon="facebook"
                            mode="contained"
                            uppercase={false}
                            color="#39559F"
                            onPress={() => { }}
                        >
                            Login
                        </Button>

                        <Button
                            style={{ width: "48%" }}
                            icon="google"
                            mode="contained"
                            uppercase={false}
                            color="#DD4C39"
                            onPress={() => console.log('Pressed')}
                        >
                            Login
                        </Button>

                    </View>

                    <View style={{ marginTop: 16, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
                            <Text style={{ fontSize: 14 }}> Don't have an account? <Text style={{ color: Global.buttonColor1, fontWeight: "bold" }}>Register</Text></Text>
                        </TouchableOpacity>
                    </View>

                </Card>
            </ScrollView>

        </View>
    );
}
export default LoginScreen;

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
        margin: 10,
    },
    view: {

    },
    backgroundtext: {
        opacity: 0.1,
        fontSize: 16,
    }
});