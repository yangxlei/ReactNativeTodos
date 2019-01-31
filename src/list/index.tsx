import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import Task from '../models/Task';
import { State } from '../reducers/action';

import { connect } from 'react-redux';
import { addTask as addTaskAction } from '../reducers/action';

interface Prop {
    tasks: Array<Task>,
    navigation: NavigationScreenProp<NavigationState>,
    addTask: (name: string, startTime: number, endTime: number) => void;
}
class TodosScreen extends React.Component<Prop> {

    static navigationOptions = {
        title: 'Todos'
    }

    public render() {
        return (
            <View>
                <Text>Todos size: {this.props.tasks.length}</Text>
                <Button title="Button" onPress={() => {
                    this.props.addTask('CBD', 0, 10);
                }} />
            </View>
        );
    }
}

export default connect((state: State) => ({
    tasks: state.tasks
}), dispatch => ({
    addTask: (name: string, startTime: number, endTime: number) => dispatch(addTaskAction(name, startTime, endTime))
}))
    (TodosScreen);