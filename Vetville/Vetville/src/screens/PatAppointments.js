import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button, Card } from 'react-native-paper';

import Global from '../utils/Global';

import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from "@react-native-community/netinfo";

import Token from '../utils/Token';

const PatAppointments = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataNotFound, setDataNotFound] = useState(false);

    const [data, setData] = useState("");

    React.useEffect(() => {
        checkInternet();
    }, []);



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
        //console.log("........", JSON.parse(user).loggedInUser.patientId);
        
        setIsLoading(true);
        setDataNotFound(false);
        fetch(Global.URL_patient_appoinments + JSON.parse(user).loggedInUser.patientId, {
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

        if (json.length > 0) {
            setData(json);
        } else {
            setDataNotFound(true);
        }
    }





    const renderItem = ({ item }) => {
        // console.log(item);

        return (
            <Card style={{ marginHorizontal: 8, marginVertical: 4, padding: 8 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ justifyContent: "center", padding: 4 }}>
                        <Image style={{ height: 80, width: 80 }} resizeMode="contain" source={{ uri: item.doctor.profileImage ? item.doctor.profileImage : "https://vetville.accepire.co/assets/img/default.png" }} />
                    </View>
                    <View style={{ padding: 8, alignItems: "center", marginLeft: 8, marginTop: 4 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Dr. {item.doctor.firstName} {item.doctor.lastName}</Text>
                        <View style={{ flexDirection: "row", marginTop: 4 }}>
                            <Text style={{ color: "#696969" }}>
                                {item.doctor.category}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: "#D3D3D3", width: "100%" }} />


                <View style={{ padding: 4, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Appt Date :</Text>
                    <Text style={{ color: "#696969" }}> {Global.isoToDate(item.appoinmentDate)} </Text>
                    <Text style={{ color: Global.buttonColor2 }}>{item.appoinmentTime}</Text>
                </View>

                <View style={{ padding: 4, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Booking Date :</Text>
                    <Text style={{ color: "#696969" }}> {Global.isoToDate(item.createdDate)}</Text>
                </View>


                <View style={{ padding: 4, alignItems: "center", flexDirection: "row" }}>
                    <Text> <Text style={{ fontWeight: "bold" }}>Amount : </Text> {item.totalAmount}</Text>
                </View>

                <View style={{ padding: 4, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Status : </Text>
                    <Text style={{ color: "green" }}> {item.appoinmentStatus}</Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center", justifyContent: "space-evenly" }}>

                    <Button icon="printer" color={Global.buttonColor2} dark={true} mode="contained" onPress={() => console.log('Pressed')}>
                        Print
                    </Button>

                    <Button icon="eye-outline" dark={true} color={Global.viewButtonColor} mode="contained" onPress={() => console.log('Pressed')}>
                        View
                    </Button>
                </View>
            </Card>
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

                    <ScrollView style={{}}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                        />
                        <View style={{ height: 140 }} />
                    </ScrollView>
                </View>
            );
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
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

export default PatAppointments;