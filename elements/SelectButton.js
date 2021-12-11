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
import CheckBox from "react-native-animated-checkbox";

import { 
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';

export default class SelectButton extends Component {
  render = () => {
    // Get the shadow settings and give them default values
    const {
      setting: {
        btnWidth = 0,
        btnHeight = 0,
        fontSize = 25,
        shadowHeight = 100,
        backgroundColor = '#4b66ea',
        color = "#000",
        realColor = "#fff",
      },
      onPressButton,
      btnText,
      isLoading,
      selected,
      style
    } = this.props;

    // Define button style
    const styles = StyleSheet.create({
      button: {
        width: btnWidth,
        minHeight: btnHeight*2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: btnHeight / 2,
        borderWidth: 2,
        borderColor: 'rgb(221,75,57)',
        padding: 10,
        // position: 'absolute'      
      },
      text: {
        fontFamily: fontFamily.semiBold,
        fontSize: fontSize,
        color: 'rgb(221,75,57)',
        marginLeft: 10,
        maxWidth: btnWidth*0.75,
        padding: 10
      },
      selectedButton: {
        backgroundColor: 'rgb(221,75,57)',
        width: btnWidth,
        height: btnHeight*2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: btnHeight / 2,
        borderWidth: 2,
        borderColor: 'rgb(221,75,57)',
      },
      selectedText: {
        fontFamily: fontFamily.semiBold,
        fontSize: fontSize,
        color: '#fff',
        marginLeft: 10
      }
    });

    // Return a view ,whose background is a svg picture
    return (
      <View style={style}>
        <TouchableHighlight
          underlayColor={'rgb(105,105,105)'}
          style={styles.button}
          onPress={()=>onPressButton(!selected)}>
            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 10}}>
              <CheckBox
                  onPress={val => onPressButton(val)}
                  checked={selected}
                  iconSize={50}
                  iconName="check"
              />
              <Text style={styles.text}>{btnText}</Text>
            </View>
        </TouchableHighlight>          

      </View>
    )
  }
}
