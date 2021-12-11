import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Text } from 'react-native';
import _ from 'lodash';
//import * as Google from 'expo-google-app-auth';
import GoogleLogin from 'react-google-login';

import Constants from 'expo-constants';

import { deviceHeight, shadowOpt } from '../../styles/variables';

import CommonStyles from '../../styles/CommonStyles';
import GoogleButton from '../../elements/GoogleButton';
import { signInSuccess, requestSignIn } from '../../redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withRouter } from "next/router"

const IOS_CLIENT_ID = '644006186372-u696pb043m82cvoo7j136umrmhm5gufu.apps.googleusercontent.com'//'732008689242-67i3dek6iuj9m2jpa6rm2c1upsh1m0no.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '644006186372-9t10rlcnr9jta2ds3dtljh0qej3sudqn.apps.googleusercontent.com'//'732008689242-s6dqv6qhusdu3t9m5neniv5sksgrne5g.apps.googleusercontent.com';

const IOS_CLIENT_ID_EXPO = '644006186372-ougj0mb107va1uunl0d68ma0nhr0slt4.apps.googleusercontent.com'//'540352903945-3lbjhujn0ep2jr72kmsuh17tku3br8lg.apps.googleusercontent.com';
const ANDROID_CLIENT_ID_EXPO = '644006186372-bg9saojiiva0cms5ro9qau9emgjfsvps.apps.googleusercontent.com'//'540352903945-7hf6dr4rjv9673l079cq1lh4f8qjie1f.apps.googleusercontent.com';
const WEB_CLIENT_ID = '644006186372-8kbtk3e3f4clhf7um2cfi999pd2efhrb.apps.googleusercontent.com';

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false,
            is_loading: false,
            is_exist: false,
        };
        this.signInToastWithStyle = React.createRef();
    }

    async componentDidMount() {
        let jsonStr = await AsyncStorage.getItem('auth');
        if ( jsonStr)
        {
            try {
                const auth = JSON.parse(jsonStr);
                console.log(auth);
                this.props.dispatch(signInSuccess(auth));
                this._goToInputScreen();
            } catch (e) {
                //error while parsing local storage
            }
        }
    }

    _goToInputScreen() {
        this.props.router.push('Home');
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.auth.auth, this.props.auth.auth)) {            
            this.setState({ is_loading: false });
            this._goToInputScreen();
        }
    }

    googleLoginSuccess = (response) => {
        const { accessToken, tokenId } = response;
        const { email, imageUrl, name } = response.profileObj;
        const clientId = WEB_CLIENT_ID;
        this.props.dispatch(requestSignIn({ name: name, email: email, photoUrl: imageUrl, idToken: tokenId, clientId: clientId }));
    }

    googleLoginFailed = (e) => {
        console.log(e);
    }

    render() {
        const { is_loading } = this.state;
        return (
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style= {styles.title}>Welcome!</Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <GoogleLogin
                        clientId={WEB_CLIENT_ID}
                        buttonText="Sign In With Google"
                        onSuccess={this.googleLoginSuccess}
                        onFailure={this.googleLoginFailed}
                        render={renderProps => (
                            <GoogleButton
                                onPressButton={renderProps.onClick}
                                setting={shadowOpt}
                                btnText="Sign In With Google"
                                isLoading={is_loading}
                            />
                        )}
                    />
                </View>
                <View style={styles.status}>
                    <Text style={styles.message}>{this.props.auth.errorMessage}</Text>
                </View>
            </View>
        );
    }

}

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        height: "100%",
        width: 600,
        margin: "auto"
    },
    titleContainer: {
        flex: 0.2,        
        justifyContent: 'center',
        alignItems: "center",
    },
    title:{
      fontSize: 40,
    },
    logoContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 202,
        height: 202
    },
    buttonGroup: {
        marginTop: 20,
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toast: {
        flex: 0.1,
    },
    status: {
        flex: 0.1,
        width: "100%"
    },
    message: {
        textAlign: "center",
        color: "red",
        fontSize: 20,
    }
});


export default withRouter(connect(({ auth }) => ({
    auth: auth,
}))(SignInScreen));