import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Header from '../Components/Header';
import Global from '../utils/Global';

import { Container, Tab, Tabs, TabHeading, Icon, ScrollableTab } from 'native-base';


import PatAppointments from './PatAppointments';
import PatPrescriptions from './PatPrescriptions';
import PatMedicalRecords from './PatMedicalRecords';
import PatBilling from './PatBilling';



const PatDashboard = (props) => {

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Global.activeScreen = "PatDashboard";
        });

        return unsubscribe;
    }, [props.navigation]);



    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#002d5f" />
            <Header isBack={true} title="Dashboard" navigation={props.navigation} />
            <Container>
                <Tabs
                    tabBarBackgroundColor="#fff"
                    tabBarUnderlineStyle={{ backgroundColor: Global.buttonColor2, height: 2 }}
                    renderTabBar={() => <ScrollableTab />}
                    onChangeTab={tab => console.log(tab)}
                >
                    <Tab

                        heading={
                            <TabHeading style={styles.tabHeading} >
                                <Text>Appointments</Text>
                            </TabHeading>
                        }
                    >
                        <PatAppointments />
                    </Tab>

                    <Tab
                        heading={
                            <TabHeading style={styles.tabHeading} >
                                <Text>Prescriptions</Text>
                            </TabHeading>
                        }
                    >
                        <PatPrescriptions />
                    </Tab>

                    <Tab
                        heading={
                            <TabHeading style={styles.tabHeading} >
                                <Text>Medical Records</Text>
                            </TabHeading>
                        }
                    >
                        <PatMedicalRecords />
                    </Tab>

                    <Tab
                        heading={
                            <TabHeading style={styles.tabHeading} >
                                <Text>Billing</Text>
                            </TabHeading>
                        }
                    >
                        <PatBilling />
                    </Tab>
                </Tabs>
            </Container>

        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
    },
    tabHeading: {
        backgroundColor: "#fff"
    }
});

export default PatDashboard;