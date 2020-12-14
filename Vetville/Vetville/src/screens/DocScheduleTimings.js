import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Header from '../Components/Header';
import Global from '../utils/Global';


const DocScheduleTimings = (props) => {

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Global.activeScreen = "DocScheduleTimings";
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={{ flex: 1 }}>
            <Header isBack={true} navigation={props.navigation} />
            <Text>DocScheduleTimings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
    }
});

export default DocScheduleTimings;