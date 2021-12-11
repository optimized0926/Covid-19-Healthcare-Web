import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Platform, Text, Image, BackHandler } from 'react-native';
import _ from 'lodash';  
import { GoogleLogout } from 'react-google-login';
// import AnimatedWave from "react-native-animated-wave";

import Particles from 'react-particles-js';

import GradientButton from '../../elements/GradientButton';
import { deviceWidth, deviceHeight, shadowOpt } from '../../styles/variables';
import UserAvatar from 'react-user-avatar';
import {ENDPOINT} from '../../utils/consts';
import { withRouter } from "next/router"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDaily } from '../../redux/actions/auth';

const getCurrentDate = () => {
    const d = new Date();
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return `${day[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
}

class ResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false,
            is_loading: false,
            is_exist: false,
        };
        this.signInToastWithStyle = React.createRef();
    }
    componentDidMount() {
        const { uiTextInfo } = this.props;
        if (!uiTextInfo) {        
            this.props.router.push('Signin');
        }
    }

    componentDidUpdate(prevProps) {

    }

    getUserState = () => {
        const status = this.props.daily;
        if (!status)
            return "green";

        if (status.tempLess == -2) {
            return status.noSymptoms ? "green" : "red";
        }
        if (!status.tempLess || !status.noSymptoms || !status.exposure) {
            return 'red';
        }
        if (status.tempLess == -1) {
            return 'yellow';
        }
        return 'green';
    }

    doThanks = () => {        
        this.props.router.push('Home'); 
    }

    logout = () => {
        AsyncStorage.clear();
        this.props.router.push('Signin');
        this.props.setDaily(null);
    }

    render() {
        const { uiTextInfo, user } = this.props;
        if (!uiTextInfo) {
            return <View></View>;
        }
        let textColor = 'rgb(221,75,57)';
        let backgroundColor = '#15AD70';
        let buttonColor = 'black';
        const avatarSize = deviceWidth > 500 ? 250 : 200;
        const avatar = !user.avatar ? null : user.avatar.startsWith("http") ? user.avatar : `${ENDPOINT}public/avatar/${user.avatar}`;       
        const state = this.getUserState();
        switch(state) {
            case 'green':
                textColor = '#fff';
                backgroundColor = '#15AD70';
                buttonColor = '#14BD70';
                break;
            case 'yellow':
                textColor = '#fff';
                backgroundColor = 'rgb(170, 136, 13)';                
                buttonColor = '#796311';
                break;
            case 'red':
                textColor = '#fff';
                backgroundColor = 'rgb(212, 51, 110)';                
                buttonColor = '#bf215b';
                break;           

        }

        return (
            <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                <View style={styles.checkView}>
                    <UserAvatar imageStyle={styles.avatar} size={avatarSize} name={user.first + " " + user.last} src={avatar} />
                    <Text style={styles.name}>{user.first + " " + user.last}</Text>
                    <Text style={styles.date}>{getCurrentDate()}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={{ ...styles.title, color: textColor,}}>{uiTextInfo.result[state]}</Text>      
                </View>
                <View style={styles.buttonGroup}>
                    <GradientButton
                        style={styles.button}
                        onPressButton={()=>this.doThanks()}
                        setting={{...shadowOpt, backgroundColor: buttonColor, color: "white"}}
                        btnText="Done"
                    />
                    <GoogleLogout
                        clientId="644006186372-8kbtk3e3f4clhf7um2cfi999pd2efhrb.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={this.logout}
                        render={renderProps => (
                            <GradientButton
                                style={styles.button}
                                onPressButton={renderProps.onClick}
                                setting={{...shadowOpt, backgroundColor: buttonColor, color: "white"}}
                                btnText="Logout"
                            />
                          )}
                        >
                    </GoogleLogout>
                </View>
                <View style={styles.waveBall}>
                    <Particles></Particles>
                </View>
            </View>
        );
    }

}

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
    container: {
        width: 600,
        margin: "auto",
        flex: 1,
        justifyContent: 'space-around',
        paddingTop: 50,
    },
    avatar: {
        borderColor: "white",
        borderWidth: 5,
    },
    wave: {
        width: deviceWidth,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    waveBall: {
        width: deviceWidth,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
    checkView: {
        height: 300,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        zIndex:999

    },
    titleContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 50,
        paddingRight: 30,
    },
    title: {
        fontSize: 24,
        color: 'rgb(221,75,57)',
        zIndex:999,
    },
    titleBox: {
        height: 52,
        ...Platform.select({
            ios: {
                marginTop: spaceHeight * 0.30,
                marginBottom: spaceHeight * 0.24,
            },
            android: {
                marginTop: spaceHeight * 0.30,
                marginBottom: spaceHeight * 0.20,
            },
        }),
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: { 
        marginTop: 20,
        fontSize: 25, 
        fontWeight: "bold",
        color: "white"
    },
    date: { 
        fontSize: 20,
        paddingTop: 10,
        color: 'white'
    },
    buttonGroup: {
        alignItems: "center",        
        zIndex: 999,
        width: "100%",
    },
    button: {
        marginBottom: 20,
    },
});

export default withRouter(connect(({ auth }) => ({
    uiTextInfo: auth.auth.uiTextInfo,
    user: auth.auth.user,
    daily: auth.daily,
}), {setDaily})(ResultScreen));