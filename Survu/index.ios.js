const styles = require('./styles.js')
const Firebase = require('firebase');
const constants = styles.constants;
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
//const Form = require('./components/form');
const { TabBarIOS, ListView, TextInput, Switch, SliderIOS, AlertIOS, DatePickerIOS, Picker, PickerIOS } = React;

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
var TabBarItemIOS = TabBarIOS.Item;


const FirebaseUrl = 'https://amber-inferno-9686.firebaseio.com/';

var ref = new Firebase(FirebaseUrl);

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

        // alert!!!/////////////////////////////
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
        //////////////////////////////////////

        found = true;
        ref.child("request").set(null);
      }
    });
    if (!found) {
      // alert!!!/////////////////////////////
      AlertIOS.alert(
        'Unfortunately, you entered an invalid code.',
        null,
        [
          {
            text: 'Ok',
            onPress: (text) => console.log('Ok')
          }
        ]
      );
      //////////////////////////////////////
    }
    //codeInvalid();
  });
});

class Survu extends Component {
  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="My Surveys" barStyle="light-content" style="styles.statusbar"/>


        <TabBarIOS
          tintColor="white"
          barTintColor={constants.actionColor}>
          <TabBarIOS.Item
            title='Add Survey'
            icon={require('./res/plus.png')}
            selected={this.state.selectedTab === 'Add Survey'}
            onPress={() => {
              this.setState({
                selectedTab: 'Add Survey',
              });
            }}>
            <View>
            <Text style={{marginTop : 300}}>Welcome!</Text>
            <ActionButton title="New Code" onPress={this._newSurvey.bind(this)}
              style={{marginTop: 400}}/>

            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="My Surveys"
            icon={require('./res/list.png')}
            selected={this.state.selectedTab === 'My Surveys'}
            onPress={() => {
              this.setState({
                selectedTab: 'My Surveys',
              });
            }}>
            <View backgroundColor='white'>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
              />
            <Text style={styles.text} >
              What is your overall satisfaction level with our service?
            </Text>
            <SliderIOS
              name='slider1'
              {...this.props}
              onValueChange={(value) => this.setState({value: value})}
              minimumValue={0}
              maximumValue={5}
              step={1}
            />
            <Text style={styles.text} >
              How would you rate our product?
            </Text>
            <SliderIOS
              name='slider2'
              {...this.props}
              onValueChange={(value) => this.setState({value: value})}
              minimumValue={0}
              maximumValue={5}
              step={1}
            />
            <Text style={styles.text} >
              Are you above the age of 16?
            </Text>
            <Switch
              name='switch1'
              id="switch1"
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              style={{marginLeft: 300}}
              value={this.state.falseSwitchIsOn}
            />
            <Text style={styles.text} >
              Would you do business with us again?
            </Text>
            <Switch
              name='switch2'
              id="switch2"
              onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
              style={{marginLeft: 300}}
              value={this.state.trueSwitchIsOn}
            />


            <ActionButton title="Done" onPress={this._submitSurvey.bind(this)}
              style={{marginBottom: 200}}/>
            <Text></Text>
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='Profile'
            icon={require('./res/user.png')}
            selected={this.state.selectedTab === 'Profile'}
            onPress={() => {
              this.setState({
                selectedTab: 'Profile',
              });
            }}>
            <View>
            <Text></Text>
            </View>
          </TabBarIOS.Item>
        </TabBarIOS>


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

  /*validCode() {
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
  }*/

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

  /*componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })
  }*/

  // if the database code is valid

  /*_renderContent (color: string, pageText: string, num?: number) {
    <View style={[styles.tabContent, {backgroundColor: color}]}>
      <Text style={styles.tabText}>{pageText}</Text>
      <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
    </View>
  }*/


}



AppRegistry.registerComponent('Survu', () => Survu);
