import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Header from '../Components/Header';
import Global from '../utils/Global';


const PatBilling = (props) => {

    React.useEffect(() => {
       
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Text>PatBilling</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
    }
});

export default PatBilling;