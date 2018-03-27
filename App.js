/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry,
  TextInput,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Modal
} from "react-native";
import Toolbar from "./app/components/Toolbar/Toolbar";
import AddButton from "./app/components/AddButton/AddButton";
import * as firebase from "firebase";
const style = require("./app/style");
const config = {
  apiKey: "AIzaSyCx8hweXVjJREwx9IW9w1CeU6ZDQbRvDOk",
  authDomain: "itemlister-8db7d.firebaseapp.com",
  databaseURL: "https://itemlister-8db7d.firebaseio.com",
  projectId: "itemlister-8db7d",
  storageBucket: "itemlister-8db7d.appspot.com",
  messagingSenderId: "719183883473"
};
firebase.initializeApp(config);

export default class App extends Component {
  constructor() {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      text: "",
      itemDataSource: ds,
      modalVisible: false
    };
    this.itemsRef = this.getRef().child("items");
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  getRef() {
    return firebase.database().ref();
  }
  componentWillMount() {
    this.getItems(this.itemsRef);
  }
  componentDidMount() {
    this.getItems(this.itemsRef);
  }
  getItems(itemsRef) {
    itemsRef.on("value", snap => {
      let items = [];
      snap.forEach(child => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }
  pressRow(item) {
    this.itemsRef.child(item._key).remove();
  }
  renderRow(item) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.pressRow(item);
        }}
      >
        <View style={style.li}>
          <Text style={style.liText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  addItem() {
    this.setModalVisible(true);
  }
  render() {
    return (
      <View style={style.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Toolbar title="Add Item" />
              <TextInput
                value={this.state.text}
                placeholder="Add Item"
                onChangeText={value => this.setState({ text: value })}
              />

              <TouchableHighlight
                onPress={() => {
                  this.itemsRef.push({ title: this.state.text });
                  this.setState({ text: "" });
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Save Item</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Toolbar title="itemLister" />
        <ListView
          dataSource={this.state.itemDataSource}
          renderRow={this.renderRow}
        />
        <AddButton onPress={this.addItem.bind(this)} title="Add Item" />
      </View>
    );
  }
}

AppRegistry.registerComponent("Toolbar", () => Toolbar);
AppRegistry.registerComponent("AddButton", () => AddButton);
