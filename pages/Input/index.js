import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Platform, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import _ from 'lodash';
import {RadioGroup, Radio} from 'react-radio-group'
import Switch from "react-switch";

import { requestUpdate, requestTodayDaily } from '../../redux/actions/auth';
//import CommonStyles from '../styles/CommonStyles';
import GradientButton from '../../elements/GradientButton';
import { deviceWidth, deviceHeight, shadowOpt } from '../../styles/variables';
import { withRouter } from "next/router"
 
class InputScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false,
            status: 0,
            is_exist: false,
            tempLess: 1,
            noSymptoms: false,
            exposure: false,
        };
        this.signInToastWithStyle = React.createRef();
    }

    componentDidMount() {  
        const { uiTextInfo } = this.props;
        if (!uiTextInfo) {        
            this.props.router.push('Signin');
            return;
        }      
        this.props.dispatch(requestTodayDaily());    
    }

    componentDidUpdate(prev) {
        if (this.props.daily != null) {
            this.props.router.push('Result');
        }
    }

    submit(attend) {
        const { uiTextInfo } = this.props;
        const userType = uiTextInfo.input.type;
        const { tempLess, noSymptoms, exposure } = this.state;
        const { status } = this.props;
        const inputData = { attend: attend, tempLess: tempLess, noSymptoms: noSymptoms, exposure: exposure };
        if (userType == "other") {
            inputData.tempLess = -2;
            this.props.dispatch(requestUpdate(inputData));
            return;
        }
        this.props.dispatch(requestUpdate(inputData));
    }

    renderForOther () { 
        const { uiTextInfo } = this.props;
        return (
            <SafeAreaView style={styles.root}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <Image
                                source={require('../../assets/input_header.png')}
                                style={styles.header}
                            />
                        </View>
                        <View style={styles.valueGroup}>
                            <Text style={styles.valueLabel}>{uiTextInfo.input.label}</Text>
                            <View style={styles.valueSwitchContainer}>
                                <Switch
                                    onColor="#B731B7"
                                    checked={this.state.noSymptoms}
                                    onChange={(val) => this.setState({noSymptoms: val})}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.alert}>
                                {uiTextInfo.input.description}
                            </Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <GradientButton
                                style={styles.button}
                                onPressButton={()=>this.submit(true)}
                                setting={shadowOpt}
                                btnText={uiTextInfo.input.button}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }


    render() {
        const { uiTextInfo } = this.props;
        if (!uiTextInfo) {
            return <View></View>;
        }
        const userType = uiTextInfo.input.type;
        if (userType == "other")
            return this.renderForOther();
        
        const radioPadding = deviceWidth > 500 ? 30 : 10;

        var radio_props = [
            'Yes', 'No', 'Unable to take temperature'
        ];
        return (
            <SafeAreaView style={styles.root}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <Image
                                source={require('../../assets/input_header.png')}
                                style={styles.header}
                            />
                        </View>
                        <View style={styles.valueGroup}>
                            <Text style={styles.valueLabel}>{uiTextInfo.input.temp_less}</Text>
                            <View style={styles.valueSwitchContainer}>
                                <RadioGroup selectedValue={this.state.tempLess} onChange={(value) => {this.setState({tempLess: value})}}>
                                    <Radio value="1" />Yes
                                    <Radio value="0" />No
                                    <Radio value="-1" />Unable to take temperature
                                </RadioGroup>
                            </View>
                        </View>
                        <View style={styles.valueGroup}>
                            <Text style={styles.valueLabel}>{uiTextInfo.input.exposure}</Text>
                            <View style={styles.valueSwitchContainer}>
                                <Switch
                                    onColor="#B731B7"
                                    checked={this.state.exposure}
                                    onChange={(val) => this.setState({exposure: val})}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.alert}>
                                {uiTextInfo.input.exposure_info}
                            </Text>
                        </View>
                        <View style={styles.valueGroup}>
                            <Text style={styles.valueLabel}>{uiTextInfo.input.no_symptoms}</Text>
                            <View style={styles.valueSwitchContainer}>
                                <Switch
                                    onColor="#B731B7"
                                    checked={this.state.noSymptoms}
                                    onChange={(val) => this.setState({noSymptoms: val})}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.alert}>
                                {uiTextInfo.input.temp_info}
                            </Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <GradientButton
                                style={styles.button}
                                onPressButton={()=>this.submit(true)}
                                setting={shadowOpt}
                                btnText={uiTextInfo.input.button1}
                            />
                            <GradientButton
                                style={styles.button}
                                onPressButton={()=>this.submit(false)}
                                setting={{...shadowOpt, backgroundColor: "#AAAAAA", color: "#222222"}}
                                btnText={uiTextInfo.input.button2}
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
    root: {
        flex: 1,
        color: "#757575",
        width: 600,
        margin: "auto"
    },
    container: {
        flex: 1,
        color: "#757575",
    },
    valueGroup: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#DDDDDD",
        borderBottomWidth: 1,
        borderBottomColor: "#888888",
        padding: 20,
    },
    valueLabel: {
        flex: 0.6,
        fontSize: 20,
        color: "#757575",
    }, 
    valueLabelH: {
        color: "#757575",
        fontSize: 20,
    }, 
    valueSwitchContainer: {
        flex: 0.4,
        alignItems: "flex-end"
    },
    radioGroup: {
        marginTop: 10,
        flex: 0.2,
        alignItems: "flex-end"
    },
    alert: {
        padding: 30,
        fontSize: 20,
        lineHeight: 30,        
        color: "#757575",
    },
    buttonGroup: {
        alignItems: "center",        
    },
    button: {
        marginBottom: 20,
    },
    checkView: {
        height: 290,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",

    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 39,
        color: 'rgb(221,75,57)',
        fontWeight: 'bold'
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
    headerContainer: {
        height: 200,
    },
    header: {
        height: 200,
    },
    spinnerTextStyle: {

    }
});


export default withRouter(connect(({ auth }) => ({
    uiTextInfo: auth.auth.uiTextInfo,
    user: auth.auth.user,
    status: auth.status,
    daily: auth.daily,
    loading: auth.loading,
}))(InputScreen));