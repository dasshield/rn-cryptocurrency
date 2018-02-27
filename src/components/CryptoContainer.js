import React, {Component} from "react";
import {ScrollView, View, StyleSheet, RefreshControl, Text, ToastAndroid} from "react-native";
import {connect} from "react-redux";
import FetchCoinData from "../actions/FetchCoinData";
import CoinCard from "./CoinCard";
import Spinner from "react-native-loading-spinner-overlay";


class CryptoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
        };
    }

    componentDidMount() {
        this.props.FetchCoinData();
    }

    renderCoinCards() {
        const {crypto} = this.props;

        if (crypto.hasError) {
            // TODO: implement toast for IOS
            ToastAndroid.show('Verify network connection', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }

        if (crypto.data.length) {
            return crypto.data.map((coin, index) => (
                <CoinCard
                    key={index}
                    coin_name={coin.name}
                    symbol={coin.symbol}
                    price_usd={coin.price_usd}
                    percent_change_7d={coin.percent_change_7d}
                    percent_change_24h={coin.percent_change_24h}
                />
            ));
        } else {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.instructions}>Nothing to display</Text>
                </View>
            );
        }

    }

    onRefresh() {
        this.setState({isRefreshing: true});
        this.props.FetchCoinData().then(() => {
            this.setState({isRefreshing: false});
        });
    }

    render() {
        const {crypto} = this.props;

        if (crypto.isFetching) {
            return (
                <View>
                    <Spinner
                        visible={crypto.isFetching}
                        textContent="Loading..."
                        textStyle={{color: "#254135"}}
                        animation="fade"
                    />
                </View>
            );
        } else {
            return (
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onRefresh()}/>
                    }>
                    {this.renderCoinCards()}
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 10,
        paddingTop: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructions: {
        color: '#333333',
        marginBottom: 5,
        fontSize: 20,
    }
});

const mapStateToProps = (state) => {
    return {
        crypto: state.crypto,
    }
};

export default connect(mapStateToProps, {FetchCoinData})(CryptoContainer);
