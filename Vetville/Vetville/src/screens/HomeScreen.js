import React, { useState, useEffect, Component, useRef } from 'react';
import {
    View,
    Text, Button
} from 'react-native';

import Globals from '../utils/Global';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from '../Components/CustomDrawer';
import DocDashboard from './DocDashboard';
import DocAppointments from './DocAppointments';
import DocMyPatients from './DocMyPatients';
import DocScheduleTimings from './DocScheduleTimings';
import DocInvoices from './DocInvoices';
import DocReviews from './DocReviews';
import Massage from './Massage';
import DocProfileSettings from './DocProfileSettings';
import ChangePassword from './ChangePassword';
import PatFavourites from './PatFavourites';
import PatDashboard from './PatDashboard';
import SearchDoctors from './SearchDoctors';

const Drawer = createDrawerNavigator();

function HomeScreen({ route, navigation }) {
    const { initScreen } = route.params;

    



    return (
        <Drawer.Navigator initialRouteName={initScreen}
            drawerContent={(props) => <CustomDrawer{...props} />}
        >

            <Drawer.Screen name="DocDashboard" component={DocDashboard} />
            <Drawer.Screen name="DocAppointments" component={DocAppointments} />
            <Drawer.Screen name="DocMyPatients" component={DocMyPatients} />
            <Drawer.Screen name="DocScheduleTimings" component={DocScheduleTimings} />
            <Drawer.Screen name="DocInvoices" component={DocInvoices} />
            <Drawer.Screen name="DocReviews" component={DocReviews} />
            <Drawer.Screen name="Massage" component={Massage} />
            <Drawer.Screen name="DocProfileSettings" component={DocProfileSettings} />
            <Drawer.Screen name="ChangePassword" component={ChangePassword} />
            <Drawer.Screen name="PatFavourites" component={PatFavourites} />
            <Drawer.Screen name="PatDashboard" component={PatDashboard} />
            <Drawer.Screen name="SearchDoctors" component={SearchDoctors} />

        </Drawer.Navigator>
    );
}
export default HomeScreen;
