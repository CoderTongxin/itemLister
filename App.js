/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight

} from 'react-native';
import Toolbar from './app/components/Toolbar/Toolbar';
import * as firebase from 'firebase';
const style = require('./app/style');
const config = {
    apiKey: "AIzaSyCx8hweXVjJREwx9IW9w1CeU6ZDQbRvDOk",
    authDomain: "itemlister-8db7d.firebaseapp.com",
    databaseURL: "https://itemlister-8db7d.firebaseio.com",
    projectId: "itemlister-8db7d",
    storageBucket: "itemlister-8db7d.appspot.com",
    messagingSenderId: "719183883473"
};
firebase.initializeApp(config);

type Props = {};
export default class App extends Component<Props> {
    constructor(){
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            itemDataSource: ds
        };
        this.itemsRef = this.getRef().child('items');
        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this)
    }
    getRef() {
        return firebase.database().ref();
    }
    componentWillMount() {
        this.getItems(this.itemsRef)
    }
    componentDidMount() {
        this.getItems(this.itemsRef)
    }
    getItems(itemsRef) {
        itemsRef.on('value',(snap=> {
            let items = [];
            snap.forEach((child) =>{
                items.push({
                    title: child.val(),
                    _key: child.key
                })
            });
            this.setState({
                itemDataSource: this.state.itemDataSource.cloneWithRows(items)
            })
        }));
    }
    pressRow(item){
        console.log(item)
    }
    renderRow(item){
        return (
            <TouchableHighlight onPress = { () => {
            this.pressRow(item)
            }}>
                <View style={style.li}>
                    <Text style={style.liText}>{item.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    render() {
        return (
            <View style={style.container}>
                <Toolbar title='itemLister'/>
                <ListView
                dataSource = {this.state.itemDataSource}
                renderRow = {this.renderRow}
                />
            </View>
        );
    }
}

AppRegistry.registerComponent('Toolbar', () => Toolbar);
