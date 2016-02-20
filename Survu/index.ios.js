const styles = require('./styles.js')
const Firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
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

import Form from 'react-native';

const FirebaseUrl = 'https://amber-inferno-9686.firebaseio.com/data';
const FirebaseUrlRequest = 'https://amber-inferno-9686.firebaseio.com/request'
const FirebaseUrlCode = 'https://amber-inferno-9686.firebaseio.com/code'
var ref = new Firebase(FirebaseUrl);
var refRequest = new Firebase(FirebaseUrlRequest);
var refCode = new Firebase(FirebaseUrlCode);

class Survu extends Component {
  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>

          <ActionButton title="New Code" onPress={this._newSurvey.bind(this)} />
      </View>
    );
  }


  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  _newSurvey() {
    AlertIOS.prompt(
      'Enter Code',
      null,
      [
        {
          text: 'Done',
          onPress: (text) => {
            refRequest.push({ reqCode: text })
          }
        },
        {
          text: 'Cancel',
          onPress: (text) => console.log('Cancel')
        }
      ],
      'plain-text'
    );
  }

  refRequest.on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    console.log("Title: " + newPost.title);
    console.log("Text: " + newPost.text);
    console.log("Previous Post ID: " + prevChildKey);

    // process the newest child (code request)
    refCode.orderByValue().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        if (data.val().value === newPost.reqCode) {
          codeValid();
          return;
        }
      });
      codeInvalid();
    });
  });

  codeValid() {
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
  }

  codeInvalid() {

  }

  _renderItem(item) {
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
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })
  }



}




AppRegistry.registerComponent('Survu', () => Survu);
