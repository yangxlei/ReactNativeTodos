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
import { State, addTask, changeTask } from '../reducers/action';
import Task from '../models/Task';

interface Props {
    findTask: (taskId: number) => Task | undefined;
    navigation: NavigationScreenProp<NavigationState>;
    createTask: (task: Task) => void;
    modifyTask: (task: Task) => void;
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
                    onPress={() => {
                        navigation.getParam('commit')();
                    }} />
            )
        }
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            task: props.findTask(props.navigation.getParam('id')) || {} as Task,
        } as EditScreenState;
        this.props.navigation.setParams({ commit: this.commit.bind(this) });
    }

    commit() {
        const { task } = this.state;

        if (task.name && task.startTime !== undefined && task.endTime !== undefined) {
            if (task.id !== undefined) {
                this.props.modifyTask(task);
            } else {
                this.props.createTask(task);
            }
            this.props.navigation.pop();
        } else {
            //TOAST 
        }
    }

    public render() {
        const { task } = this.state;
        return (
            <View>
                <TextInputView title="名称: " titleStyle={{ fontSize: 16, color: 'black' }}
                    value={task.name}
                    onChangeText={(text) => {
                        this.setState({
                            task: {
                                ...task,
                                name: text
                            }
                        });
                    }}
                    style={{
                        borderBottomColor: '#CCC',
                        borderBottomWidth: 1,
                        flex: 0
                    }} />

                <TextInputView title="描述: " titleStyle={{ fontSize: 16, color: 'black' }}
                    value={task.desc}
                    onChangeText={(text) => {
                        this.setState({
                            task: {
                                ...task,
                                desc: text
                            }
                        });
                    }}
                    style={{
                        borderBottomColor: '#CCC',
                        borderBottomWidth: 1,
                    }} />
                <View style={{ flexDirection: 'row', }}>
                    <TextInputView title="开始: " titleStyle={{ fontSize: 16, color: 'black' }}
                        value={`${task.startTime === undefined ? 0 : task.startTime}`}
                        onChangeText={(text) => {
                            this.setState({
                                task: {
                                    ...task,
                                    startTime: Number(text)
                                }
                            });
                        }}
                        style={{
                            borderBottomColor: '#CCC',
                            borderBottomWidth: 1,
                            flex: 1
                        }} />

                    <TextInputView title="结束: " titleStyle={{ fontSize: 16, color: 'black' }}
                        value={`${task.endTime === undefined ? 0 : task.endTime}`}
                        onChangeText={(text) => {
                            this.setState({
                                task: {
                                    ...task,
                                    endTime: Number(text)
                                }
                            });
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
}, dispatch => {
    return {
        createTask: (task: Task) => {
            dispatch(addTask(task.name, task.startTime, task.endTime, task.desc));
        },
        modifyTask: (task: Task) => {
            dispatch(changeTask(task.id, task.name, task.startTime, task.endTime, task.desc));
        }
    }
})(EditScreen);