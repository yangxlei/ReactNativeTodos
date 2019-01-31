import React from 'react';
import {
    View,
    Text
} from 'react-native';

export default class EditScreen extends React.Component {

    static navigationOptions = {
        title: "Edit"
    }

    public render() {
        return (
            <View>
                <Text>Edit Task</Text>
            </View>
        );
    }
}