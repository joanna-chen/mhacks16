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



class Survu extends Component {
  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>

          <ActionButton title="Add" onPress={this._newSurvey.bind(this)} />






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
  AlertIOS.alert(
    'Start New Survey',
    null,
    [
      {
        text: 'Start',
        onPress: (text) => {
          this.itemsRef.push({ title: text })
        }
      },
    ],
    'plain-text'
  );
}

  _renderItem(item) {
    return (
      <ListItem item={item} onPress={() => {}} />
    );
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })
  }



}




AppRegistry.registerComponent('Survu', () => Survu);
