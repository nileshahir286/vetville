import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Header from '../Components/Header';
import Global from '../utils/Global';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Token from '../utils/Token';
import { Button, Card } from 'react-native-paper';


import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';


const DocMyPatients = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataNotFound, setDataNotFound] = useState(false);

    const [data, setData] = useState("");

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Global.activeScreen = "DocMyPatients";
            checkInternet();
        });

        return unsubscribe;
    }, [props.navigation]);


    const checkInternet = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                fetchData();
            } else {
                Global.connectionFailed(() => checkInternet());
            }
        });
    }

    const fetchData = async () => {

        var user = await AsyncStorage.getItem(Global.KEY_USER);

        setIsLoading(true);
        setDataNotFound(false);
        fetch(Global.URL_doctor_getpatients + JSON.parse(user).loggedInUser.doctorId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(user).token
            },
        })
            .then((response) => response.json())
            .then((json) => {
                //console.log("response " + JSON.stringify(json.data.length));
                fetchDataResponse(json.data);

            })
            .catch((error) => {
                console.error(error);

                setIsLoading(true);
                Token.checkGenerateNewToken(() => fetchData());
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const fetchDataResponse = (json) => {

        //        console.log("...............", JSON.stringify(json));

        if (json.length > 0) {
            setData(json);
        } else {
            setIsLoading(false);
            setDataNotFound(true);
        }
    }


    const renderItem = ({ item }) => {
        // console.log(item);
        return (
            <View style={{ width: "50%" }}>
                <TouchableOpacity onPress={() => { }}>
                    <Card style={{ padding: 8, marginLeft: 8, marginBottom: 8 }}>

                        <View style={{ width: "100%", alignItems: "center" }}>
                            <View style={{ justifyContent: "center", padding: 4 }}>
                                <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: item.profileImage ? item.profileImage : "https://vetville.accepire.co/assets/img/default.png" }} />
                            </View>

                            <View style={{ padding: 8, marginTop: 4 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.firstName} {item.lastName}</Text>
                            </View>

                            <View style={{ padding: 4, flexDirection: "row" }}>
                                <Text style={{ color: "#696969", fontWeight: "bold", fontSize: 14 }}>Patient ID : </Text>
                                <Text style={{ color: "#696969", fontSize: 14 }}>{item.patientNumber}</Text>
                            </View>

                            <View style={{ padding: 4, flexDirection: "row" }}>
                                <Entypo name="location-pin" color="#696969" size={15} />
                                <Text style={{ color: "#696969", fontSize: 14 }}>{item.address}, {item.city}</Text>
                            </View>
                            
                            <View style={{ padding: 4, flexDirection: "row" }}>
                                <Entypo name="phone" color="#696969" size={14} />
                                <Text style={{ color: "#696969", fontSize: 14 }}> {item.phone}</Text>
                            </View>

                            <View style={{ height: 1, marginTop: 4, backgroundColor: "#D3D3D3", width: "100%" }} />


                            <View style={{ padding: 4, flexDirection: "row" }}>
                                <Text style={{ color: "#696969", fontWeight: "bold", fontSize: 14 }}>Patient ID : </Text>
                                <Text style={{ color: "#696969", fontSize: 14 }}>{item.patientNumber}</Text>
                            </View>



                        </View>

                        {/* <View style={{ marginTop: 8, alignItems: "center" }}>

                        <Button
                            icon="eye-outline"
                            style={{ width: "100%" }}
                            dark={true}
                            color={Global.buttonColor2}
                            mode="contained"
                            onPress={() => {
                                setDialogItem(item);
                                setDialogVisible(!dialogVisible);
                            }}
                        >
                            View
                    </Button>
                    </View> */}
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }


    const getView = () => {

        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={Global.primaryColor} />
                </View>
            );
        } else if (dataNotFound) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: Global.primaryColor }}>Data Not Found</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <ScrollView style={{ paddingRight: 8, paddingTop: 8 }}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            numColumns={2}
                        />
                        <View style={{ height: 180 }} />
                    </ScrollView>
                </View>
            );
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <Header title="My Patients" isBack={true} navigation={props.navigation} />
            {getView()}

        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
    }
});

export default DocMyPatients;