import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Dialog } from 'react-native-simple-dialogs';

const DocAppointments = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataNotFound, setDataNotFound] = useState(false);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogItem, setDialogItem] = useState("");



    const [data, setData] = useState("");


    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Global.activeScreen = "DocAppointments";
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
        fetch(Global.URL_doctor_appoinments + JSON.parse(user).loggedInUser.doctorId, {
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

        //console.log("...............", JSON.stringify(json));

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
            <Card style={{ marginHorizontal: 8, marginVertical: 4, padding: 8 }}>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ justifyContent: "center", padding: 4 }}>
                        <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: item.patient.profileImage ? item.patient.profileImage : "https://vetville.accepire.co/assets/img/default.png" }} />
                    </View>
                    <View style={{ padding: 8, marginLeft: 8, marginTop: 4 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.patient.firstName} {item.patient.lastName}</Text>

                        <View style={{ paddingVertical: 4, alignItems: "center", flexDirection: "row" }}>
                            <AntDesign name="clockcircleo" color="#696969" size={14} />
                            <Text style={{ color: "#696969", marginLeft: 4 }}> {Global.isoToDate(item.appoinmentDate)},</Text>
                            <Text style={{ color: "#696969", marginLeft: 4 }}> {item.appoinmentTime} </Text>
                        </View>

                        <View style={{ paddingVertical: 4, alignItems: "center", flexDirection: "row" }}>
                            <Entypo name="location-pin" color="#696969" size={15} />
                            <Text style={{ color: "#696969", marginLeft: 4 }}> {item.patient.address}, {item.patient.city} </Text>
                        </View>

                        <View style={{ paddingVertical: 4, alignItems: "center", flexDirection: "row" }}>
                            <FontAwesome name="envelope" color="#696969" size={14} />
                            <Text style={{ color: "#696969", marginLeft: 4 }}> {item.patient.emailAddress} </Text>
                        </View>

                        <View style={{ paddingVertical: 4, alignItems: "center", flexDirection: "row" }}>
                            <Entypo name="phone" color="#696969" size={15} />
                            <Text style={{ color: "#696969", marginLeft: 4 }}> {item.patient.phone} </Text>
                        </View>

                    </View>
                </View>

                <View style={{ marginTop: 8, alignItems: "center" }}>

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
                        <View style={{ height: 180 }} />
                    </ScrollView>
                </View>
            );
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <Header isBack={true} title="Appointments" navigation={props.navigation} />

            <Dialog
                visible={dialogVisible}
                onTouchOutside={() => setDialogVisible(false)}
                titleStyle={{ backgroundColor: Global.buttonColor2, margin: 0, padding: 8, fontWeight: "bold", color: "#fff" }}
                title={Global.appName}
                contentStyle={{ padding: 0, marginTop: 0 }} >
                <View>
                    <View style={{ paddingHorizontal: 4, paddingLeft: 12 }}>

                        <Text style={styles.title} >{dialogItem != "" ? dialogItem.appoinmentNumber : ""}</Text>
                        <Text style={styles.info} >
                            {dialogItem != "" ? Global.isoToDate(dialogItem.appoinmentDate) + ", " + dialogItem.appoinmentTime : ""}
                        </Text>

                        <Text style={styles.title} >
                            Status:
                        </Text>
                        <Text style={styles.info} >{dialogItem != "" ? dialogItem.appoinmentStatus : ""}</Text>

                        <Text style={styles.title} >
                            Confirm Date:
                        </Text>
                        <Text style={styles.info} >{dialogItem != "" ? Global.isoToDate(dialogItem.appoinmentDate) : ""}</Text>

                        <Text style={styles.title} >
                            Paid Amount
                        </Text>
                        <Text style={styles.info} >{dialogItem != "" ? dialogItem.totalAmount + " $" : ""} </Text>

                    </View>
                    <View style={{ padding: 8, alignItems: "center", marginTop: 8 }}>
                        <Button
                            dark={true}
                            style={{ elevation: 8, backgroundColor: "#000", marginRight: 2, width: "40%" }}
                            uppercase={false}
                            mode="contained"
                            onPress={() => { setDialogVisible(false) }}>
                            Close
                        </Button>
                    </View>
                </View>
            </Dialog>


            {getView()}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
    },
    title: {
        fontWeight: "bold",
        marginTop: 4
    },
    info: {
        color: "#696969"
    }
});

export default DocAppointments;