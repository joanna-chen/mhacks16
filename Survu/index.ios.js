const styles = require('./styles.js')
const Firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const { ListView, TextInput, Switch, SliderIOS, DatePickerIOS, Picker, PickerIOS } = React;

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

        <ActionButton title="Add" onPress={() => {}} />



          <Switch type="Switch" name="mySwitch" />
          <SliderIOS type="SliderIOS" name="anotherSwitch" />
          <DatePickerIOS type="DatePickerIOS" name="birthday" />
          <Picker type="Picker" name="myPicker" />

          <PickerIOS type="PickerIOS" name="pickers[ios]" /> // Yes, we support form serialization, like the web


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
