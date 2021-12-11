import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import { 
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';

export default class GoogleButton extends Component {
  render = () => {
    // Get the shadow settings and give them default values
    const {
      setting: {
        btnWidth = 0,
        btnHeight = 0,
        fontSize = 18,
        shadowHeight = 100,
        backgroundColor = '#E0316C',
        color = "#000",
        realColor = "#fff",
        style = {}
      },
      onPressButton,
      btnText,
      isLoading
    } = this.props;

    // Define button style
    const styles = StyleSheet.create({
      button: {
        width: 300,
        height: btnHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: btnHeight / 2,
      },
      text: {
        fontFamily: fontFamily.semiBold,
        fontSize: fontSize,
        color: '#fff',
      },
    });

    // Return a view ,whose background is a svg picture
    return (
      <View>
        <LinearGradient
          start={{x: 0.2, y: 0.4}} end={{x: 1.0, y: 1.0}}
          colors={[backgroundColor, backgroundColor]}
          style={[styles.button, {position: 'relative'}]}>
          {isLoading?<ActivityIndicator size="large" color="#ffffff" />:
            <TouchableHighlight
              underlayColor={'rgb(105,105,105)'}
              style={styles.button}
              onPress={onPressButton}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: "#fff", fontSize: 47}}>G </Text>
                  <Text style={styles.text}>{btnText}</Text>
                </View>
              
            </TouchableHighlight>          
          }
        </LinearGradient>
      </View>
    )
  }
}
