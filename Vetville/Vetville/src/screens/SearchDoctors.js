import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    AppState,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Appbar, Button, Card, Chip } from 'react-native-paper';
import Header from '../Components/Header';
import Global from '../utils/Global';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingBar from '../Components/RatingBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RBSheet from "react-native-raw-bottom-sheet";

import { CheckBox } from 'react-native-elements';

import NetInfo from "@react-native-community/netinfo";
import { CommonActions } from '@react-navigation/native';
import Token from '../utils/Token';

const SearchDoctors = (props) => {
    const [doctorData, setDoctorData] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [dataNotFound, setDataNotFound] = useState(false);

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [urology, setUrology] = useState(false);
    const [neurology, setNeurology] = useState(false);
    const [dentist, setDentist] = useState(false);
    const [orthopedic, setOrthopedic] = useState(false);
    const [cardiologist, setCardiologist] = useState(false);



    var RBsheet = null;

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Global.activeScreen = "SearchDoctors";


        });
        checkInternet();
        return unsubscribe;
    }, [props.navigation]);


    const checkInternet = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                fetchDoctorData();
            } else {
                Global.connectionFailed(() => checkInternet());
            }
        });
    }


    const fetchDoctorData = async () => {

        //  var token = await AsyncStorage.getItem(Global.KEY_USER_TOKEN);

        var user = await AsyncStorage.getItem(Global.KEY_USER);

        setIsLoading(true);
        setDataNotFound(false);
        fetch(Global.URL_doctor_getfiltered, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(user).token
            },
            body: JSON.stringify(
                {
                    "gender": {
                        "male": male,
                        "female": female
                    },
                    "specialist": {
                        "urology": urology,
                        "neurology": neurology,
                        "dentist": dentist,
                        "orthopedic": orthopedic,
                        "cardiologist": cardiologist
                    }
                }
            ),
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log("response " + JSON.stringify(json.length));
                fetchDoctorDataResponse(json);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(true);
                Token.checkGenerateNewToken(() => fetchDoctorData());

                // Alert.alert(
                //     'Token Expired',
                //     "",
                //     [
                //         {
                //             text: 'OK', onPress: () => {
                //                 props.navigation.dispatch(
                //                     CommonActions.reset({
                //                         index: 0,
                //                         routes: [{ name: 'LoginScreen' }]
                //                     })
                //                 );
                //             }
                //         }
                //     ],
                //     { cancelable: false }
                // );
            }
            )
            .finally(() => {
                setIsLoading(false);
            });
    }



    const fetchDoctorDataResponse = (json) => {
        if (json.length > 0) {
            setDoctorData(json);
        } else {
            setDataNotFound(true);
        }
    }


    const getDoctorServices = (item) => {
        var services = [];
        // console.log(item.doctorServices.length);

        for (let i = 0; i < item.doctorServices.length; i++) {
            //console.log(".........",item.doctorServices[i].service);
            services.push(
                <Text
                    style={{
                        marginRight: 4,
                        borderWidth: 1,
                        padding: 4,
                        borderRadius: 2,
                        color: Global.primaryColor,
                        borderColor: Global.primaryColor
                    }}
                > {item.doctorServices[i].service} </Text>
            );

        }

        return services;

    }


    const renderItem = ({ item }) => {

        // console.log(item.profileImage);

        return (
            <Card style={{ marginHorizontal: 8, marginVertical: 4, padding: 8 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ justifyContent: "center" }}>
                        <Image style={{ height: 100, width: 100 }} resizeMode="contain" source={{ uri: item.profileImage ? item.profileImage : "https://vetville.accepire.co/assets/img/default.png" }} />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Dr. {item.firstName} {item.lastName}</Text>

                        <View style={{ flexDirection: "row", marginTop: 4 }}>
                            <FontAwesome5 name="briefcase-medical" size={15} color={Global.buttonColor2} />
                            <Text style={{ color: Global.buttonColor2, marginLeft: 8 }}>
                                {item.category}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 4, alignItems: "center" }}>
                            <RatingBar rate={4} />
                            <Text style={{ fontSize: 12, marginLeft: 4 }}>(17)</Text>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 4 }}>
                            <Ionicons name="location-sharp" size={18} color="#808080" />
                            <Text>{item.city ? item.city + "," : ""} </Text>
                            <Text>{item.country ? item.country : ""}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: "#D3D3D3", width: "100%" }} />
                <View style={{ marginTop: 4, flexDirection: "row" }}>
                    {getDoctorServices(item)}
                </View>

                <View style={{ flexDirection: "row", marginTop: 12 }}>
                    <AntDesign name="like2" size={18} />
                    <Text style={{ marginLeft: 4 }}>98%</Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: 4, alignItems: "center" }}>
                    <Fontisto name="comment" size={16} />
                    <Text style={{ marginLeft: 4 }}>17 Feedback</Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: 4, alignItems: "center" }}>
                    <MaterialCommunityIcons name="cash" size={20} />
                    <Text style={{ marginHorizontal: 4 }}>$300 - $1000</Text>
                    <FontAwesome name="info-circle" size={18} />
                </View>
                <View style={{ marginTop: 8 }}>
                    <Button
                        style={{ borderWidth: 1, borderColor: Global.buttonColor2 }}
                        mode="outlined"
                        color={Global.buttonColor2}
                        onPress={() => console.log('Pressed')}
                    >
                        View Profile
                    </Button>

                    <Button
                        style={{ marginTop: 4 }}
                        mode="contained"
                        dark={true}
                        color={Global.buttonColor2}
                        onPress={() => console.log('Pressed')}
                    >
                        Book Appointment
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
                    {/* <TouchableOpacity>

                        <Card style={{ width: "100%", padding: 12, justifyContent: "flex-end" }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                                <Text >Search Filter</Text>

                            </View>
                        </Card>

                    </TouchableOpacity> */}

                    <ScrollView style={{}}>
                        <FlatList
                            data={doctorData}
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
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor={Global.primaryColor} translucent={false} />


            <Appbar.Header style={{ backgroundColor: "#FFF" }}>

                <TouchableOpacity
                    onPress={() => { props.navigation.toggleDrawer() }}
                    style={{ width: "10%", justifyContent: "center", alignItems: "center" }}
                >
                    <Ionicons name="menu" color="#000" style={{ marginLeft: 8 }} size={32} />
                </TouchableOpacity>

                <View style={{ width: "80%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>Search Doctors</Text>
                </View>

                <TouchableOpacity onPress={() => { RBsheet.open() }} style={{ width: "10%" }}>
                    <Ionicons name="filter-sharp" size={24} />
                </TouchableOpacity>

            </Appbar.Header>



            <RBSheet
                ref={ref => {
                    RBsheet = ref;
                }}
                openDuration={100}
                customStyles={{
                    container: {
                    }
                }}
                height={600}
                onClose={() => { console.log("close.....") }}
            >
                <View>
                    <View style={{ padding: 12, flexDirection: "row", justifyContent: "space-between" }} >
                        <Text style={{ fontSize: 18, color: Global.primaryColor, fontWeight: "bold" }}>
                            Search Filter
                        </Text>

                        <TouchableOpacity style={{ marginRight: 4 }} onPress={() => RBsheet.close()}>
                            <Ionicons name="md-close" size={24} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", height: 2, backgroundColor: "#D3D3D3" }} />

                    <View style={{ padding: 12 }}>
                        <Text style={{ marginBottom: 4, marginLeft: 8, fontSize: 17, color: Global.primaryColor, fontWeight: "bold" }}>
                            Gender
                        </Text>

                        <CheckBox
                            title='Male'
                            checked={male}
                            onPress={() => { setMale(!male) }}
                        />
                        <CheckBox
                            title='Female'
                            checked={female}
                            onPress={() => { setFemale(!female) }}
                        />

                        <Text style={{ marginBottom: 4, marginLeft: 8, marginTop: 8, fontSize: 17, color: Global.primaryColor, fontWeight: "bold" }}>
                            Select Specialist
                        </Text>

                        <CheckBox
                            title='Urology'
                            checked={urology}
                            onPress={() => { setUrology(!urology) }}
                        />

                        <CheckBox
                            title='Neurology'
                            checked={neurology}
                            onPress={() => { setNeurology(!neurology) }}
                        />

                        <CheckBox
                            title='Dentist'
                            checked={dentist}
                            onPress={() => { setDentist(!dentist) }}
                        />

                        <CheckBox
                            title='Orthopedic'
                            checked={orthopedic}
                            onPress={() => { setOrthopedic(!orthopedic) }}
                        />

                        <CheckBox
                            title='Cardiologist'
                            checked={cardiologist}
                            onPress={() => { setCardiologist(!cardiologist) }}
                        />

                    </View>

                    <Button
                        style={{ marginTop: 4, marginHorizontal: 12 }}
                        mode="contained"
                        dark={true}
                        color={Global.buttonColor2}
                        onPress={() => {
                            RBsheet.close();
                            checkInternet();
                        }}
                    >
                        Search
                    </Button>

                </View>
            </RBSheet>


            { getView()}
        </View >
    );
}

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
    }
});

export default SearchDoctors;