import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RatingBar = (props) => {


    const getStar = () => {
        var starList = [];

        var num = props.rate;

        for (let index = 0; index < num; index++) {
            starList.push(<FontAwesome name="star" size={14} style={{ color: "#FDD700", marginLeft: 2 }} />)
        }

        for (let index = 0; index < 5 - num; index++) {
            starList.push(<FontAwesome name="star-o" size={14} style={{ color: "#808080", marginLeft: 2 }} />)
        }

        return starList;
    }


    return (
        <View style={{ flexDirection: "row" }}>

            {getStar()}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "80%",
        height: 180,
    }
});

export default RatingBar;


