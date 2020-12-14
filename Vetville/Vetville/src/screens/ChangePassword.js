import React, { useState, useEffect } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import Header from '../Components/Header';
import Global from '../utils/Global';

import NetInfo from "@react-native-community/netinfo";
import Loader from "react-native-modal-loader";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChangePassword = (props) => {

    const [oldPassword, setOldPassword] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Global.activeScreen = "ChangePassword";
        });

        return unsubscribe;
    }, [props.navigation]);


    const checkInternet = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                onchangePwd();
            } else {
                Global.connectionFailed(() => checkInternet());
            }
        });
    }


    const onchangePwd = async () => {

        var user = await AsyncStorage.getItem(Global.KEY_USER);

        //console.log(JSON.parse(user).userDetail.email);
        setIsLoading(true);

        fetch(Global.URL_changepassword, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "email": JSON.parse(user).userDetail.email,
                    "currentPassword": oldPassword,
                    "newPassword": password
                }
            ),
        })
            .then((response) => response.json())
            .then((json) => {
                //console.log("response " + JSON.stringify(json));
                onchangePwdResponse(json);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setIsLoading(false);
            });
    }

    const onchangePwdResponse = (json) => {

        if (json.success == true) {
            setOldPassword("");
            setpassword("");
            setConfirmPassword("");

            alert(json.result);
        } else {
            alert(json.errorMessages[0])
        }

    }

    const formValidate = () => {

        if (oldPassword == "") {
            alert("Enter Old Password");
        } else if (password == "") {
            alert("Enter New Password");
        } else if (confirmPassword == "") {
            alert("Enter Confirm Password");
        } else if (confirmPassword != password) {
            alert("Password does not match");
        } else {
            onchangePwd();
        }

    }

    return (
        <View style={{ flex: 1 }}>
            <Header isBack={true} title="Change Password" navigation={props.navigation} />

            <Loader loading={isLoading} color={Global.primaryColor} />

            <ScrollView keyboardShouldPersistTaps="always">

                <Card style={{ margin: 4, padding: 4, marginBottom: 16, paddingBottom: 12 }}>
                    <TextInput
                        label="Old Password"
                        value={oldPassword}
                        mode="outlined"
                        underlineColor="#000"
                        secureTextEntry={true}
                        textContentType="username"
                        theme={{ colors: { primary: Global.primaryColor } }}
                        style={{ marginTop: 4 }}
                        onChangeText={text => { setOldPassword(text) }}
                    />

                    <TextInput
                        label="New Password"
                        value={password}
                        mode="outlined"
                        underlineColor="#000"
                        secureTextEntry={true}
                        textContentType="username"
                        theme={{ colors: { primary: Global.primaryColor } }}
                        style={{ marginTop: 4 }}
                        onChangeText={text => { setpassword(text) }}
                    />

                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        mode="outlined"
                        underlineColor="#000"
                        secureTextEntry={true}
                        textContentType="username"
                        theme={{ colors: { primary: Global.primaryColor } }}
                        style={{ marginTop: 4 }}
                        onChangeText={text => { setConfirmPassword(text) }}
                    />

                    <Button
                        style={{ marginTop: 16 }}
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        color={Global.buttonColor1}
                        onPress={() => formValidate()}>
                        <Text style={{ fontSize: 18 }}>Save Changes</Text>
                    </Button>

                </Card>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
    }
});

export default ChangePassword;