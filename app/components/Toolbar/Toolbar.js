import React, {Component} from 'react';
import {
    Text,
    View,
    StatusBar
} from 'react-native';

const style = require('../../style');

type Props = {};
export default class Toolbar extends Component<Props> {
    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="coral"
                    barStyle="light-content"
                />
                <View style={style.navbar}>
                    <Text style={style.navbarTitle}>
                        {this.props.title}
                    </Text>
                </View>
            </View>
        );
    }
}

