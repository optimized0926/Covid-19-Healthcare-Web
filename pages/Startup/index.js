import * as Font from 'expo-font';
import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { withRouter } from "next/router"

import helper from '../../utils/helper';

class StartUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        }
        this.isAuthenticated = helper.getAuth();
    }

    async componentDidMount() {
        this.setState({ fontLoaded: true });
    }


    render() {
        if (this.state.fontLoaded) {
            setTimeout(() => {                
                console.log(this.props.router)
                this.props.router.push('Signin');
                //this.props.navigation.navigate('SignInScreen');
            }, 2000);         
        }

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff'
                }}
            >
                <Image
                    source={require('../../assets/icon.png')}
                    style={{ width: 202, height: 202 }}
                />
            </View>
        );
    }
}

export default withRouter(StartUpScreen)
