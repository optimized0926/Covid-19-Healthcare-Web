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

export default class GradientButton extends Component {
  constructor(props) {
    super(props)
  }
  render = () => {
    // Get the shadow settings and give them default values
    const {
      setting: {
        btnWidth = 0,
        btnHeight = 0,
        fontSize = 18,
        shadowHeight = 100,
        backgroundColor = '#E0316C',
        color = "#fff",
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
        width: btnWidth,
        height: btnHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: btnHeight / 4,
      },
      text: {
        fontFamily: fontFamily.semiBold,
        fontSize: fontSize,
        color: color,
      },
    });

    // Return a view ,whose background is a svg picture
    return (
      <View style={{marginBottom: 20, marginLeft: 10, marginRight: 10}}>
        <LinearGradient
          start={{x: 0.2, y: 0.4}} end={{x: 1.0, y: 1.0}}
          colors={[backgroundColor, backgroundColor]}
          style={[styles.button, {position: 'relative'}]}>
          {isLoading?<ActivityIndicator size="large" color="#ffffff" />:
            <TouchableHighlight
              underlayColor={'rgb(105,105,105)'}
              style={styles.button}
              onPress={onPressButton}>
              <Text style={styles.text}>{btnText}</Text>
            </TouchableHighlight>          
          }
        </LinearGradient>
      </View>
    )
  }
}
