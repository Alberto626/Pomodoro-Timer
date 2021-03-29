import { StatusBar } from 'expo-status-bar';
import React, { createRef } from 'react';

import { StyleSheet, Text, View, Button,TextInput, Alert, Vibration} from 'react-native';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.textInput1 = React.createRef(); // used to clear text inputs on reset
    this.textInput2 = React.createRef();
    this.textInput3 = React.createRef();
    this.textInput4 = React.createRef();
    this.state = {
      currentMinute1: 5,
      currentMinute2: 5,
      currentSecond1: 0,
      currentSecond2: 0,
      isPaused: true,
      textInputMinute1: '5',
      textInputMinute2: '5',
      textInputSecond1: '0',
      textInputSecond2: '0',
      isReseted: true,
      leftPadding: "0",
      leftPadding2: '0',
      timer1: null,
      timer2: null,

    }
    this.resetButton = this.resetButton.bind(this);
    this.alertTest = this.alertTest.bind(this);
    this.startButton = this.startButton.bind(this);
    this.countDownTimer1 = this.countDownTimer1.bind(this);
    this.countDownTimer2 = this.countDownTimer2.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
  }
  resetButton() { // reset default values of times
    this.setState({
      currentMinute1: 5,
      currentMinute2: 5,
      currentSecond1: 0,
      currentSecond2: 0,
      isPaused: true,
      isReseted: true,
      textInputMinute1: '5',
      textInputMinute2: '5',
      textInputSecond1: '0',
      textInputSecond2: '0',
      leftPadding: '0',
      leftPadding2: '0',
      timer1: null,
      timer2: null
    });
    this.pauseButton();
    this.textInput1.current.clear()
    this.textInput2.current.clear()
    this.textInput3.current.clear()
    this.textInput4.current.clear()
  }
  pauseButton() {
    if(this.state.timer1 !== null) {
      clearInterval(this.state.timer1)
    }
    if(this.state.timer2 !== null) {
      clearInterval(this.state.timer2)
    }
    this.setState({
      isPaused: true
    })
  }
  startButton() {
    if(this.state.isPaused) {
      if(this.state.isReseted) { // when the button is first pressed
        this.setState({
          currentMinute1: parseInt(this.state.textInputMinute1),
          currentMinute2: parseInt(this.state.textInputMinute2),
          currentSecond1: parseInt(this.state.textInputSecond1),
          currentSecond2: parseInt(this.state.textInputSecond2)
        })
        if(this.state.textInputSecond1 >= 10) {
          this.setState({
            leftPadding: ''
          })
        }
        if(this.state.textInputSecond2 >= 10) {
          this.setState({
            leftPadding2: ''
          })
        }
      }
      this.setState({ // prevent text inputs from being touched
        isPaused: false,
        isReseted: false
      })
      if(this.state.currentMinute1 !== 0 || this.state.currentSecond1 !== 0) {
        this.setState({
          timer1: setInterval(this.countDownTimer1, 1000)
        })
      }
      if(this.state.currentMinute1 === 0 && this.state.currentSecond1 === 0 && (this.state.currentMinute2 !== 0 || this.state.currentSecond2)) {
        this.setState({
          timer2: setInterval(this.countDownTimer2, 1000)
        })
      }

    }
    else {
      //do nothing
    }
  }
  countDownTimer1() {
    if(this.state.currentSecond1 <= 10) { //when seconds <= 10
      if(this.state.currentSecond1 === 0 && this.state.currentMinute1 !== 0) { // when x:00
        this.setState({
          currentMinute1: this.state.currentMinute1 -= 1,
          currentSecond1: 59,
          leftPadding: ''
        })
      }
      else if(this.state.currentSecond1 === 0 && this.state.currentMinute1 === 0) { // when 00:00
        clearInterval(this.state.timer1)
        Vibration.vibrate(5000, false)
        this.setState({
          timer1: null,
          timer2: setInterval(this.countDownTimer2,1000)
        })

      }
      else { //when xx:10 or below 10
        this.setState({
          leftPadding: '0',
          currentSecond1: this.state.currentSecond1 -= 1
        })
      }
    }
    else {
      this.setState( {
        currentSecond1: this.state.currentSecond1 -= 1
      })
    }
  }
  countDownTimer2() {
    if(this.state.currentSecond2 <= 10) {
      if(this.state.currentSecond2 === 0 && this.state.currentMinute2 !== 0) { // when x:00
        this.setState({
          currentMinute2: this.state.currentMinute2 -= 1,
          currentSecond2: 59,
          leftPadding2: ''
        })
      }
      else if(this.state.currentSecond2 === 0 && this.state.currentMinute2 === 0) { // when 00:00
        clearInterval(this.state.timer2)
        Vibration.vibrate(5000, false)
        this.setState({
          timer2: null
        })
      }
      else { //when xx:10 or below 10
        this.setState({
          leftPadding2: '0',
          currentSecond2: this.state.currentSecond2 -= 1
        })
      }
    }
    else {
      this.setState( {
        currentSecond2: this.state.currentSecond2 -= 1
      })
    }
  }
  alertTest() {
      alert(this.state.textInputMinute1);
  }
  render() {
    return (
      <View >
        <View style = {page.timer}>
          <Text style = {page.biggerText}>Work Timer</Text>
          <Text style = {page.largerTimer}>
           {this.state.currentMinute1}:{this.state.leftPadding}{this.state.currentSecond1}
          </Text>
          <Text style = {page.biggerText}>Break Timer</Text>
          <Text style = {page.largerTimer}>
            {this.state.currentMinute2}:{this.state.leftPadding2}{this.state.currentSecond2}
            </Text>
          </View>
      <View style = {page.buttons}>
      <Button
        title = "Start/Resume"
        onPress = {this.startButton} />

      <Button 
        title = "Pause"
        onPress = {this.pauseButton} />
      <Button
       title = "reset"
        onPress = {this.resetButton} />

        </View>
          <TextInput style = {page.text1}
                      placeholder = {"Minute 1"}
                      editable = {this.state.isReseted} 
                      keyboardType = 'number-pad'
                      onChangeText = {textInputMinute1 => this.setState({textInputMinute1})}
                      ref = {this.textInput1}
          ></TextInput>
          <TextInput style = {page.text2} 
                      placeholder = {"Second 1"}
                      editable = {this.state.isReseted}
                      keyboardType = 'number-pad'
                      onChangeText = {textInputSecond1 => this.setState({textInputSecond1})}
                      ref = {this.textInput2}
          ></TextInput>
          <TextInput style = {page.text3} 
                      placeholder = {"Minute 2"}
                      editable = {this.state.isReseted}
                      keyboardType = 'number-pad'
                      onChangeText = {textInputMinute2 => this.setState({textInputMinute2})}
                      ref = {this.textInput3}
          ></TextInput>
          <TextInput style = {page.text4} 
                      placeholder = {"Second 2"}
                      editable = {this.state.isReseted}
                      keyboardType = 'number-pad'
                      onChangeText = {textInputSecond2 => this.setState({textInputSecond2})}
                      ref = {this.textInput4}
          ></TextInput>

      </View>
    );
  }
}
const page = StyleSheet.create({
  buttons: {
    width: 100,
    top: 350
  },
  text1: {
    width: 100,
    left: 189,
    top: 280,
    borderWidth: 1,
    borderColor: "black"
  },
  text2: {
    width: 100,
    left: 290,
    top: 250,
    borderWidth: 1,
    borderColor: "black"
  },
  text3: {
    width: 100,
    left: 189,
    top: 250,
    borderWidth: 1,
    borderColor: "black"
  },
  text4: {
    width: 100,
    left: 290,
    top: 220,
    borderWidth: 1,
    borderColor: "black"
  },
  timer: {
    left: 150,
    top: 100,
  },
  biggerText: {
    fontSize: 40,
    right: 50
  },
  largerTimer: {
    fontSize: 30
  }
})
export default App;
