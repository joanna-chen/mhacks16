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

const FirebaseUrl = 'https://amber-inferno-9686.firebaseio.com/data';
const resultUrl = 'https://amber-inferno-9686.firebaseio.com/result';
var rref = new Firebase(FirebaseUrl);
var ref_results = new Firebase(resultUrl);

arr = {}

class Survu extends Component {
  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}
        />

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

        <ActionButton title="Add"
          onPress={this._newSurvey.bind(this)}
        />

        <ActionButton title="Done" onPress={this._submitSurvey.bind(this)} />

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
      switch1 : this.state.switch1,
      switch2 : this.switch2,
      slider : this.slider
    });
    //will do later
  }

  _newSurvey() {
  var itemsRef = rref.child("anything");
  AlertIOS.prompt(
    'Start New Survey',
    null,
    [
      {
        text: 'Start',
        onPress: (text) => {
          itemsRef.push({ title: text })
        }
      },
    ],
    'plain-text'
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
