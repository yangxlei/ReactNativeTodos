import React from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationTransitionProps } from 'react-navigation';

import TextInputView from '../components/TextInputView';
import { connect } from 'react-redux';
import { State } from '../reducers/action';
import Task from '../models/Task';

interface Props {
    findTask: (taskId: number) => Task | undefined;
    navigation: NavigationScreenProp<NavigationState>;
}

interface EditScreenState {
    task: Task
}

class EditScreen extends React.Component<Props, EditScreenState> {

    static navigationOptions = ({ navigation }: NavigationTransitionProps) => {
        return {
            title: navigation.getParam('id') ? 'Edit' : 'Add',
            headerRight: (
                <Button title="Confirm"
                    onPress={() => { }} />
            )
        }
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            task: props.findTask(props.navigation.getParam('id')) || {} as Task,
        } as EditScreenState;
    }

    public render() {
        const { task } = this.state;
        return (
            <View>
                <TextInputView title="名称: " titleStyle={{ fontSize: 16, color: 'black' }}
                    value={task.name}
                    onChangeText={(text) => {
                    }}
                    style={{
                        borderBottomColor: '#CCC',
                        borderBottomWidth: 1,
                        flex: 0
                    }} />

                <TextInputView title="描述: " titleStyle={{ fontSize: 16, color: 'black' }}
                    value={task.desc}
                    onChangeText={(text) => {
                    }}
                    style={{
                        borderBottomColor: '#CCC',
                        borderBottomWidth: 1,
                    }} />
                <View style={{ flexDirection: 'row', }}>
                    <TextInputView title="开始: " titleStyle={{ fontSize: 16, color: 'black' }}
                        value={`${task.startTime & 0}`}
                        onChangeText={(text) => {
                        }}
                        style={{
                            borderBottomColor: '#CCC',
                            borderBottomWidth: 1,
                            flex: 1
                        }} />

                    <TextInputView title="结束: " titleStyle={{ fontSize: 16, color: 'black' }}
                        value={`${task.endTime & 0}`}
                        onChangeText={(text) => {
                        }}
                        style={{
                            borderBottomColor: '#CCC',
                            borderBottomWidth: 1,
                            flex: 1
                        }} />
                </View>
            </View>
        );
    }
}

export default connect((state: State) => {
    return {
        findTask: (taskId: number) => state.tasks.find(task => task.id === taskId),
    }
})(EditScreen);