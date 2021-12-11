import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Linking  } from 'react-native';
import _ from 'lodash';

import { deviceHeight, shadowOpt } from '../../styles/variables';
import { requestTodayDaily } from '../../redux/actions/auth';

//import CommonStyles from '../styles/CommonStyles';
import GradientButton from '../../elements/GradientButton';
import { withRouter } from "next/router"

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false,
            is_loading: false,
            is_exist: false,
        };
    }
    componentDidMount() {
        const { uiTextInfo } = this.props;
        if (!uiTextInfo) {        
            return this.props.router.push('Signin');
        }
        this.props.dispatch(requestTodayDaily());  
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.auth.auth, this.props.auth.auth)) {
            this.state.is_loading = false;
            this._goToInputScreen();
            return;
        }
        if (this.props.daily != null) {
            this.props.router.push('Result');
        }
    }

    begin = () => {        
        this.props.router.push('Input');
    }

    openTerms = () => {
        Linking.openURL('http://gratus.techaround.com/policy');
    }

    render() {
        const { uiTextInfo } = this.props;
        console.log(uiTextInfo);
        if (!uiTextInfo) {
            return <View></View>;
        }
        const userType = uiTextInfo.input.type;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.content}>
                        <View style={styles.titleContainer}>
                            <Text style= {styles.title}>{uiTextInfo.login.title}</Text>
                        </View>
                        <View style={styles.instructionContainer}>
                            <Text style={styles.instruction}>
                                {uiTextInfo.login.instruction}
                            </Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <GradientButton
                                style={styles.button}
                                onPressButton={()=>this.begin()}
                                setting={shadowOpt}
                                btnText="Begin"
                            />
                            <GradientButton
                                style={styles.button}
                                onPressButton={()=>this.openTerms()}
                                setting={{...shadowOpt, backgroundColor: "#AAAAAA", color: "#222222"}}
                                btnText="Terms of Use and Privacy Policy"
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 600,
        margin: "auto"
    },
    content: {
    },
    titleContainer: {
        marginTop: 80,
        justifyContent: 'flex-end',
        alignItems: "flex-start",
    },
    title: {
        fontSize: 40,
        paddingLeft: 40,
    },
    instruction: {
        marginTop: 30,
        marginBottom: 30,
        paddingLeft: 50,
        paddingRight: 50,
        fontSize: 22,
        color: "#757575",
    },    
    buttonGroup: {
        alignItems: "center",        
    },
    button: {
        marginBottom: 20,
    },
});


export default withRouter(connect(({ auth }) => ({
    auth: auth,
    uiTextInfo: auth.auth.uiTextInfo,
    daily: auth.daily,
}))(HomeScreen));