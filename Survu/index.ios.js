const styles = require('./styles.js')
const Firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
//const Form = require('./components/form');
const { ListView, TextInput, Switch, SliderIOS, AlertIOS, DatePickerIOS, Picker, PickerIOS } = React;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';


const resultUrl = 'https://amber-inferno-9686.firebaseio.com/result';

var React = require('react-native');
var ref_results = new Firebase(resultUrl);



const FirebaseUrl = 'https://amber-inferno-9686.firebaseio.com/';

var ref = new Firebase(FirebaseUrl);


ref.child("request").on("child_added", function(snapshot) {
  var newPost = snapshot.val();
  //console.log("Title: " + newPost.title);
  //console.log("Text: " + newPost.text);
  //console.log("Previous Post ID: " + prevChildKey);

  // process the newest child (code request)
  /*refCode.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      if (data.val() === newPost.reqCode) {
        codeValid();
        return;
      }
    });
    codeInvalid();
  });*/
  ref.child("code").once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.val() === newPost) {
        codeValid();
        return true;
      }
    });
    //codeInvalid();
  });
});

var App = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}/>


        <Switch
          ref='switch1'
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={{marginLeft: 300, marginBottom: 50}}
          value={this.state.falseSwitchIsOn}
        />

        <Switch
          ref='switch2'
          onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
          style={{marginLeft: 300, marginBottom: 300}}
          value={this.state.trueSwitchIsOn}
        />

        <Text style={styles.text} >
          {'Slider: ' + this.state.value}
        </Text>

        <SliderIOS
          ref='slider'
          {...this.props}
          onValueChange={(value) => this.setState({value: value})}
          minimumValue={0}
          maximumValue={10}
          step={1}
        />



        <ActionButton title="Done" onPress={this._submitSurvey.bind(this)} />

          <ActionButton title="New Code" onPress={this._newSurvey.bind(this)} />

      </View>
    );
  },

  constructor: function(props) {
    super(props);
    return (
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        })
      };
    );
  },


  _newSurvey: function() {
    return (
      AlertIOS.prompt(
        'Enter Code',
        null,
        [
          {
            text: 'Done',
            onPress: (text) => {
              ref.child("request").push({ reqCode: text })
            }
          },
          {
            text: 'Cancel',
            onPress: (text) => console.log('Cancel')

          }
        ],
        'plain-text'
      );

    //  x();
    //  y(); // just to check that it works
    );
  },

  checkDB: function() {
    return (
      ref.child("code").once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          AlertIOS.alert(
            'next thing',
            null,
            [
              {
                text: childSnapshot.val(),
                onPress: (text) => console.log('Ok')
              }
            ]
          );
        });
        //codeInvalid();
      });
    );
  },

  validCode: function() {
    return (
      AlertIOS.alert(
        'Code Valid',
        null,
        [
          {
            text: 'Ok',
            onPress: (text) => console.log('Ok')
          }
        ]
      );
    );
  },

  _renderItem: function(item) {
    const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ],
        'default'
      );
    };
    return (
      <ListItem item={item} onPress={onPress} />
    );
  },

  componentDidMount: function() {
    return (
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
      })
    );
  },

  // if the database code is valid




});


AppRegistry.registerComponent('Survu', () => Survu);
