import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ConfirmDialog } from 'react-native-simple-dialogs';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Global from '../utils/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';





const activeColorTint = "#FFF";
const activeBGColor = Global.backgroundColor;


const CustomDrawer = ({ navigation }) => {

    const [roles, setRoles] = useState("Patient");
    const [isVisible, setIsVisible] = useState(false);
    const [userData, setUserData] = useState("");



    useEffect(() => {
        checkLogin();

        //console.log("navigation..", JSON.stringify(navigation));


    }, []);

    const checkLogin = async () => {

        try {
            var userRoles = await AsyncStorage.getItem(Global.KEY_USER_ROLES);
            var user = await AsyncStorage.getItem(Global.KEY_USER);
            setUserData(JSON.parse(user));


            if (userRoles == "Doctor") {
                setRoles("Doctor");
            } else {
                setRoles("Patient")
            }
        } catch (error) {
            // Error retrieving data
        }
    }


    const singOut = async () => {
        setIsVisible(false);
        await AsyncStorage.removeItem(Global.KEY_ISLOGIN);
        navigation.closeDrawer();
        navigation.replace("LoginScreen")
    }


    const getPatientOptions = () => {
        return (
            <View>

                <DrawerItem label="Search Doctors"
                    onPress={() => {
                        navigation.navigate("SearchDoctors");
                        Global.activeScreen = "SearchDoctors";
                    }}
                    activeTintColor={activeColorTint}
                    activeBackgroundColor={activeBGColor}
                    focused={Global.activeScreen == "SearchDoctors"}
                />

                <DrawerItem label="Dashboard"
                    onPress={() => {
                        navigation.navigate("PatDashboard");
                        Global.activeScreen = "PatDashboard";
                    }}

                    activeTintColor={activeColorTint}
                    activeBackgroundColor={activeBGColor}
                    focused={Global.activeScreen == "PatDashboard"}
                />


                {/* <DrawerItem label="Favourites"
                    onPress={() => {
                        navigation.navigate("PatFavourites");
                        Global.activeScreen = "PatFavourites";
                    }}
                    activeTintColor={activeColorTint}
                    activeBackgroundColor={activeBGColor}
                    focused={Global.activeScreen == "PatFavourites"}
                /> */}



            </View>
        );

    }

    const getDoctorOptions = () => {
        return (
            <View>

                <DrawerItem label="Dashboard"
                    onPress={() => {
                        navigation.navigate("DocDashboard");
                        Global.activeScreen = "DocDashboard";
                    }}

                    activeTintColor={activeColorTint}
                    activeBackgroundColor={activeBGColor}
                    focused={Global.activeScreen == "DocDashboard"}
                />

                <DrawerItem label="Appointments"
                    onPress={() => {
                        navigation.navigate("DocAppointments");
                        Global.activeScreen = "DocAppointments";
                    }}

                    activeTintColor={activeColorTint}
                    activeBackgroundColor={activeBGColor}
                    focused={Global.activeScreen == "DocAppointments"}
                />

                <DrawerItem label="My Patients"
                    onPress={() => {
                        navigation.navigate("DocMyPatients");
                        Global.activeScreen = "DocMyPatients";
                    }}
                    activeTintColor={activeColorTint}
                    activeBackgroundColor={activeBGColor}
                    focused={Global.activeScreen == "DocMyPatients"}
                />

                {/* <DrawerItem label="Schedule Timings"
                    onPress={() => {
                        navigation.navigate("DocScheduleTimings");
                        Global.activeScreen = "DocScheduleTimings";
                    }}
                    activeTintColor={activeColorTint}
                    activeBackgroundColor={activeBGColor}
                    focused={Global.activeScreen == "DocScheduleTimings"}
                />

                <DrawerItem label="Invoices"
                    onPress={() => {
                        navigation.navigate("DocInvoices");
                        Global.activeScreen = "DocInvoices";
                    }}
                    activeTintColor={activeColorTint}
                    activeBackgroundColor={activeBGColor}
                    focused={Global.activeScreen == "DocInvoices"}
                />

                <DrawerItem label="Reviews"
                    onPress={() => {
                        navigation.navigate("DocReviews");
                        Global.activeScreen = "DocReviews";
                    }}
                    activeTintColor={activeColorTint}
                    activeBackgroundColor={activeBGColor}
                    focused={Global.activeScreen == "DocReviews"}
                /> */}

            </View>
        );
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>


            <ConfirmDialog
                title={Global.appName}
                dialogStyle={{ borderRadius: 10 }}
                titleStyle={{ color: "#000", fontWeight: "bold" }}
                message="Are you sure you want to logout?"
                messageStyle={{ fontSize: 16 }}
                visible={isVisible}
                onTouchOutside={() => { setIsVisible(false) }}
                positiveButton={{
                    title: "YES",
                    titleStyle: { color: Global.primaryColor },
                    onPress: () => {
                        singOut();
                    }
                }}
                negativeButton={{
                    title: "NO",
                    titleStyle: { color: "#000" },
                    onPress: () => setIsVisible(false)
                }}
            />



            <View style={{ height: 160, backgroundColor: Global.backgroundColor, justifyContent: "space-evenly", alignItems: "center" }}>

                <Image style={{ height: 70, width: 70, borderRadius: 70 / 2, backgroundColor: "#fff" }} source={{ uri: userData !== "" ? userData.loggedInUser.profileImage : "" }} />
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "#FFF", fontSize: 16 }}>{userData !== "" ? userData.loggedInUser.firstName : ""} {userData !== "" ? userData.loggedInUser.lastName : ""}</Text>
                    < Text style={{ color: "#FFF", fontSize: 16 }}>{userData !== "" ? userData.loggedInUser.emailAddress : ""}</Text>
                </View>

            </View>

            <View style={{ flex: 1 }} >
                <ScrollView style={{ paddingTop: 8 }}>

                    {roles == "Doctor" ?
                        getDoctorOptions()
                        :
                        getPatientOptions()
                    }

                    <DrawerItem label="Massage"
                        onPress={() => {
                            navigation.navigate("Massage");
                            Global.activeScreen = "Massage";
                        }}
                        activeTintColor={activeColorTint}
                        activeBackgroundColor={activeBGColor}
                        focused={Global.activeScreen == "Massage"}
                    />

                    {/* <DrawerItem label="Profile Settings"
                        onPress={() => {
                            navigation.navigate("DocProfileSettings");
                            Global.activeScreen = "DocProfileSettings";
                        }}
                        activeTintColor={activeColorTint}
                        activeBackgroundColor={activeBGColor}
                        focused={Global.activeScreen == "DocProfileSettings"}
                    />

                    <DrawerItem label="ChangePassword"
                        onPress={() => {
                            navigation.navigate("ChangePassword");
                            Global.activeScreen = "ChangePassword";
                        }}
                        activeTintColor={activeColorTint}
                        activeBackgroundColor={activeBGColor}
                        focused={Global.activeScreen == "ChangePassword"}
                    /> */}

                </ScrollView>
            </View>
            <View style={{ bottom: 0, margin: 10 }}>
                <DrawerItem label="Sign Out" icon={() => (<FontAwesome name="sign-out" size={22} />)}
                    onPress={() => { setIsVisible(true) }} />
            </View>
        </SafeAreaView>
    )
}
export default CustomDrawer;