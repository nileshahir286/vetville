import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import Header from '../Components/Header';
import Global from '../utils/Global';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Token from '../utils/Token';



const DocDashboard = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataNotFound, setDataNotFound] = useState(false);

    const [data, setData] = useState("");

    const [count, setCount] = useState("");


    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Global.activeScreen = "DocDashboard";
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
        // console.log("........", JSON.parse(user).loggedInUser.doctorId);

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
                //   setIsLoading(false);
            });
    }

    const fetchDataResponse = (json) => {

        if (json.length > 0) {
            setData(json);
            fetchCounts();
        } else {
            setIsLoading(false);
            setDataNotFound(true);
        }

    }



    const fetchCounts = async () => {

        var user = await AsyncStorage.getItem(Global.KEY_USER);

        // console.log("........", JSON.parse(user).loggedInUser.doctorId);
        // setDataNotFound(false);
        // console.log("..............", Global.URL_doctor_getcounts + JSON.parse(user).loggedInUser.doctorId);


        fetch(Global.URL_doctor_getcounts + JSON.parse(user).loggedInUser.doctorId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(user).token
            },
        })
            .then((response) => response.json())
            .then((json) => {
              //  console.log("response " + JSON.stringify(json));
                setCount(json);
            })
            .catch((error) => {
                console.error(error);

                // setIsLoading(true);
                // Token.checkGenerateNewToken(() => fetchData());
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const renderItem = ({ item }) => {
        // console.log(item);
        return (
            <Card style={{ marginHorizontal: 8, marginVertical: 4, padding: 8 }}>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ justifyContent: "center", padding: 4 }}>
                        <Image style={{ height: 40, width: 40, borderRadius: 20 }} source={{ uri: item.patient.profileImage ? item.patient.profileImage : "https://vetville.accepire.co/assets/img/default.png" }} />
                    </View>
                    <View style={{ padding: 8, alignItems: "center", marginLeft: 8, marginTop: 4 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.patient.firstName} {item.patient.lastName}</Text>
                    </View>
                </View>

                <View style={{ height: 1, marginTop: 8, backgroundColor: "#D3D3D3", width: "100%" }} />

                <View style={{ padding: 4, alignItems: "center", flexDirection: "row", marginTop: 4 }}>
                    <Text style={{ fontWeight: "bold" }}>Appt Date :</Text>
                    <Text style={{ color: "#696969" }}> {Global.isoToDate(item.appoinmentDate)} </Text>
                    <Text style={{ color: Global.buttonColor2 }}>{item.appoinmentTime}</Text>
                </View>

                <View style={{ padding: 4, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Purpose : </Text>
                    <Text style={{ color: "#696969" }}> {item.purpose} </Text>
                </View>

                <View style={{ padding: 4, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Paid Amount :</Text>
                    <Text style={{ color: "#696969" }}> {item.totalAmount} </Text>
                </View>


                <View style={{ marginTop: 8, alignItems: "center" }}>

                    <Button
                        icon="eye-outline"
                        style={{ width: "100%" }}
                        dark={true}
                        color={Global.buttonColor2}
                        mode="contained"
                        onPress={() => console.log('Pressed')}
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
                    <Card style={{ margin: 8, paddingVertical: 4, paddingHorizontal: 4 }}>
                        <View style={{ flexDirection: "row" }}>

                            <View style={{ flex: 1, padding: 8 }}>
                                <Text style={styles.title}>Total Patient</Text>
                                <Text style={styles.infoValue}>{count == "" ? "" : count.data.totalPatients}</Text>
                                <Text style={styles.info}>Till Today</Text>
                            </View>

                            <View style={{ flex: 1, borderColor: "#DDD", borderLeftWidth: 1, borderRightWidth: 1, padding: 8 }}>
                                <Text style={styles.title}>Today Patient</Text>
                                <Text style={styles.infoValue}>{count == "" ? "" : count.data.todayPatients}</Text>
                                <Text style={styles.info}>10 Dec 2020</Text>
                            </View>

                            <View style={{ flex: 1, padding: 8 }}>
                                <Text style={styles.title}>Appoinments</Text>
                                <Text style={styles.infoValue}>{count == "" ? "" : count.data.totalAppoinments}</Text>
                                <Text style={styles.info}>Till Today</Text>
                            </View>

                        </View>
                    </Card>
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
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#002d5f" />
            <Header isMenuIcon={true} title="Dashboard" navigation={props.navigation} />

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
        fontSize: 16,
        color: Global.primaryColor,
    },
    infoValue: {
        fontSize: 16,
        color: Global.primaryColor,
        fontWeight: "bold"
    },
    info: {
        color: "#696969"
    }

});

export default DocDashboard;