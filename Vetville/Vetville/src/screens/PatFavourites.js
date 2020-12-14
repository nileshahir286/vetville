import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Header from '../Components/Header';
import Global from '../utils/Global';


const PatFavourites = (props) => {

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Global.activeScreen = "PatFavourites";
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={{ flex: 1 }}>
            <Header isBack={true}  navigation={props.navigation} />
            <Text>PatFavourites</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
    }
});

export default PatFavourites;