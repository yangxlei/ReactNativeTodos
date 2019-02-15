import React from 'react';
import {
    View,
    Text,
    TextInput,
    TextInputProps,
    StyleSheet
} from 'react-native';

export interface TextInputViewProps extends TextInputProps {
    title: string;
    titleStyle?: object,
}

export default class TextInputView extends React.Component<TextInputViewProps> {
    render() {
        return (
            <View style={Object.assign({}, this.props.style, { flexDirection: 'row', margin: 10, justifyContent: 'flex-start' })}>
                <Text style={this.props.titleStyle || {}}>{this.props.title}</Text>
                <TextInput {...this.props} />
            </View>
        );
    }
}