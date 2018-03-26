import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';

const style = require('../../style');
const constantColor = style.constants;

type Props = {};
export default class AddButton extends Component<Props> {
    render() {
        return (
            <View style={style.action}>
                <TouchableHighlight
                underlayColor='#24ce84'
                onPress={this.props.onPress}
                >
                <Text style={style.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}