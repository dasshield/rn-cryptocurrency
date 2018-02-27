import React from "react";
import {StyleSheet, Text, View} from "react-native";


const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Cryptocurrency</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        marginTop: 15,
        alignItems: "center",
        paddingBottom: 5,
    },
    header: {
        fontWeight: "bold",
        fontSize: 20,
    },
});

export default Header;
