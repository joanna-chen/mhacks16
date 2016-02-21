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

var ref_results = new Firebase(resultUrl);



const FirebaseUrl = 'https://amber-inferno-9686.firebaseio.com/';

var ref = new Firebase(FirebaseUrl);


const userUrl = 'https://amber-inferno-9686.firebaseio.com/user';

var ref_user = new Firebase(userUrl);

var authData = ref.getAuth();

var creditCard;

if (authData) {
  console.log("User " + authData.uid + " is logged in with " + authData.provider);
  ref_user.child(authData.uid).once("value", function (snapshot) {
    creditCard = snapshot.val()
  })
} else {
  ref.authAnonymously(function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      ref_user.child(authData.uid).set({
          creditCard: 123249487,
      });
      creditCard = 123249487
    }
  });
}





// "listener" for testing if code is valid
ref.child("request").on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val().reqCode; // the value of the code being validated
  console.log(snapshot.val().reqCode);

  console.log("Title: " + newPost);
  ref.child("code").once("value", function(snapshot1) {
    var found = false;
    snapshot1.forEach(function(childSnapshot) {
      if (found) return;
      if (childSnapshot.val() === newPost) {
        console.log("found one");
        //validCode();
        found = true;
        ref.child("request").set(null);
      }
    });
    if (!found) {
      console.log("you suck");
    }
    //codeInvalid();
  });
});


class Survu extends Component {
  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}/>


        <Switch
          name='switch1'
          id="switch1"
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={{marginLeft: 300, marginBottom: 50}}
          value={this.state.falseSwitchIsOn}
        />

        <Switch
          name='switch2'
          id="switch2"
          onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
          style={{marginLeft: 300, marginBottom: 300}}
          value={this.state.trueSwitchIsOn}
        />

        <Text style={styles.text} >
          {'Slider: ' + this.state.value}
        </Text>

        <SliderIOS
          name='slider'
          id="slider"
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
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  _submitSurvey() {
    ref_results.push({
      switch1 : this.state.falseSwitchIsOn || false,
      switch2 : this.state.trueSwitchIsOn || false,
      slider : this.state.value || -1
    });
    //will do later
  }

  _newSurvey() {
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

    //x();
    //y(); // just to check that it works
  }
/*
  var x = function() {
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
  };*/

  validCode() {
    AlertIOS.alert(
      'Survey Added',
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
    AlertIOS.alert(
      'Unfortunately, the code you entered is invalid.',
      null,
      [
        {
          text: 'Ok',
          onPress: (text) => console.log('Ok')
        }
      ]
    );
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

  // if the database code is valid




}


AppRegistry.registerComponent('Survu', () => Survu);
