import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Image, TouchableOpacity,
    Text
} from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

import Global from '../utils/Global';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';





export default Header = (props) => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const getLogo = () => {
        return <Image
            style={{ height: 32, width: 128, marginLeft: 8 }}
            resizeMode="stretch"
            source={require('../images/logo.png')} />
    }

    const getMenuIconView = () => {

        return (
            <TouchableOpacity
                onPress={() => { setIsMenuVisible(true) }}
                style={{ width: "10%", justifyContent: "center", alignItems: "center" }}
            >
                <Menu
                    visible={isMenuVisible}
                    onDismiss={() => setIsMenuVisible(false)}
                    contentStyle={{ backgroundColor: "#fff" }}
                    anchor={

                        <Entypo name="dots-three-vertical" color="#fff" size={24} />

                    }>
                    <Menu.Item onPress={() => { setIsMenuVisible(false) }} titleStyle={{ color: "#000" }} title="Item 1" />
                    <Menu.Item onPress={() => { setIsMenuVisible(false) }} titleStyle={{ color: "#000" }} title="Item 2" />
                    <Menu.Item onPress={() => { setIsMenuVisible(false) }} titleStyle={{ color: "#000" }} title="Item 3" />
                </Menu>
            </TouchableOpacity>
        );
    }


    const getTitle = () => {
        return <Text style={{ fontSize: 20 }}>{props.title}</Text>;
    }


    if (props.isBack) {
        return (
            <Appbar.Header style={{ backgroundColor: "#FFF" }}>

                <TouchableOpacity
                    onPress={() => { props.navigation.goBack() }}
                    style={{ width: "10%", justifyContent: "center", alignItems: "center" }}
                >
                    <Ionicons name="arrow-back" color="#000" style={{ marginLeft: 8 }} size={28} />
                </TouchableOpacity>

                <View style={{ width: "80%", justifyContent: "center", alignItems: "center" }}>
                    {props.title ? <Text style={{ fontSize: 20 }}>{props.title}</Text> : getLogo()}
                </View>

                <View style={{ width: "10%" }}>

                </View>

            </Appbar.Header>

        );
    }
    else if (props.isMenuIcon) {

        return (
            <Appbar.Header style={{ backgroundColor: "#FFF" }}>

                <TouchableOpacity
                    onPress={() => { props.navigation.toggleDrawer() }}
                    style={{ width: "10%", justifyContent: "center", alignItems: "center" }}
                >
                    <Ionicons name="menu" color="#000" style={{ marginLeft: 8 }} size={32} />
                </TouchableOpacity>

                <View style={{ width: "80%", justifyContent: "center", alignItems: "center" }}>
                    {getTitle()}
                </View>

                <View style={{ width: "10%" }}>

                </View>

            </Appbar.Header>

        );
    }
    else {
        return (
            <Appbar.Header style={{ backgroundColor: "#FFF" }}>


                <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    {getLogo()}
                </View>

                {/* {getMenuIconView()} */}

            </Appbar.Header>

        );
    }

};


const styles = StyleSheet.create({
    engine: {
        position: 'absolute',
        right: 0,
    },
});

