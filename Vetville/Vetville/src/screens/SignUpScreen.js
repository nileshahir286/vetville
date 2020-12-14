import React, { useState, useEffect, Component, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Animated,
    StatusBar, View, Text, ScrollView, TouchableWithoutFeedback, Alert
} from 'react-native';


import Global from '../utils/Global';
import Header from '../Components/Header';
import { Button, Card, Menu, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Octicons from 'react-native-vector-icons/Octicons';



const themeTextInput = {
    colors: {
        primary: Global.primaryColor
    }
};


const SignUpScreen = ({ navigation }) => {

    const [isDoctor, setIsDoctor] = useState(false);
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const [menuVisible, setmenuVisible] = useState(false);
    const [menuValue, setmenuValue] = useState("Select Breed");



    useEffect(() => {

    }, []);


    const isDoctorChange = () => {
        setIsDoctor(!isDoctor)

        if (!isDoctor) {
            setmenuValue("Select Speciality");
        } else {
            setmenuValue("Select Breed");
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor={Global.primaryColor} translucent={false} />
            <Header isBack={true} navigation={navigation} />

            <ScrollView style={{ flexGrow: 1 }} >
                <Card style={{ marginTop: 20, marginHorizontal: 8, marginBottom: 20, paddingVertical: 8, paddingHorizontal: 8 }}>
                    <View style={{ alignItems: "center" }}>

                        <Text style={{ fontSize: 22 }}>
                            {!isDoctor ? "Patient Register" : "Doctor Register"}
                        </Text>

                        <TouchableOpacity onPress={() => isDoctorChange()}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 4, color: Global.secondaryColor }}>
                                {!isDoctor ? "Are you a Doctor?" : "Not a Doctor?"}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <TextInput
                        label="First Name"
                        value={fname}
                        mode="outlined"
                        underlineColor="#000"
                        theme={themeTextInput}
                        style={styles.input}
                        onChangeText={text => { setfname(text) }}
                    />

                    <TextInput
                        label="Last Name"
                        value={lname}
                        mode="outlined"
                        underlineColor="#000"
                        theme={themeTextInput}
                        style={styles.input}
                        onChangeText={text => { setlname(text) }}
                    />

                    <TextInput
                        label="Email"
                        value={email}
                        mode="outlined"
                        underlineColor="#000"
                        keyboardType="email-address"
                        theme={themeTextInput}
                        style={styles.input}
                        onChangeText={text => { setEmail(text) }}
                    />

                    <TextInput
                        label="Mobile"
                        value={mobile}
                        mode="outlined"
                        underlineColor="#000"
                        keyboardType="phone-pad"
                        theme={themeTextInput}
                        style={styles.input}
                        onChangeText={text => { setMobile(text) }}
                    />


                    <Menu
                        visible={menuVisible}
                        onDismiss={() => { setmenuVisible(false) }}
                        style={{
                            width: "90%",
                            marginTop: 16
                        }}
                        anchor={
                            <TouchableOpacity style={[styles.input, {
                                backgroundColor: '#f6f6f6',
                                borderColor: "#717171",
                                borderWidth: 1,
                                borderRadius: 4,
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 12,
                                justifyContent: "space-between",

                            }]}
                                onPress={() => setmenuVisible(true)}
                            >
                                <Text>{menuValue}</Text>
                                <Octicons name="chevron-down" size={20} />
                            </TouchableOpacity>
                        }>

                        {!isDoctor && <Menu.Item onPress={() => { setmenuValue("Dog"); setmenuVisible(false) }} title="Dog" />}
                        {!isDoctor && <Menu.Item onPress={() => { setmenuValue("Cat"); setmenuVisible(false) }} title="Cat" />}

                        {isDoctor && <Menu.Item onPress={() => { setmenuValue("Urology"); setmenuVisible(false) }} title="Urology" />}
                        {isDoctor && <Menu.Item onPress={() => { setmenuValue("Neurology"); setmenuVisible(false) }} title="Neurology" />}
                        {isDoctor && <Menu.Item onPress={() => { setmenuValue("Orthopedic"); setmenuVisible(false) }} title="Orthopedic" />}
                        {isDoctor && <Menu.Item onPress={() => { setmenuValue("Cardiologist"); setmenuVisible(false) }} title="Cardiologist" />}
                        {isDoctor && <Menu.Item onPress={() => { setmenuValue("Dentist"); setmenuVisible(false) }} title="Dentist" />}


                    </Menu>


                    <TextInput
                        label="Create Password"
                        value={password}
                        mode="outlined"
                        underlineColor="#000"
                        keyboardType="phone-pad"
                        theme={themeTextInput}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={text => { setPassword(text) }}
                    />

                    <View style={{ marginTop: 16, alignItems: "flex-end" }} >
                        <TouchableOpacity
                            onPress={() => { Alert.alert("test") }}>
                            <Text style={{ fontSize: 14 }}>Already have an account? </Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        style={{ marginTop: 16 }}
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        color={Global.buttonColor1}
                        onPress={() => console.log('Pressed')}>
                        <Text style={{ fontSize: 18 }}>Singup</Text>
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
                            onPress={() => console.log('Pressed')}
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




                    <View style={{ height: 40 }} />
                </Card>
                <View style={{ height: 40 }} />
            </ScrollView>

        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
        margin: 10,
    },
    input: {
        marginTop: 16,
        height: 52
    },
    backgroundtext: {
        opacity: 0.1,
        fontSize: 16,
    }
});