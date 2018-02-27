import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, CryptoContainer} from "./src/components";
import {Provider} from "react-redux";
import Store from "./src/store/Store";


type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={Store}>
                <View>
                    <Header/>
                    <CryptoContainer/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({});
