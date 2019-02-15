import React from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationActions, NavigationTransitionProps } from 'react-navigation';

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

    static navigationOptions = ({ navigation }: NavigationTransitionProps) => {
        return {
            title: 'Todos',
            headerRight: (
                <Button title="Add"
                    onPress={() => navigation.navigate('Edit')} />
            )
        }
    }

    public _renderItem = (info: ListRenderItemInfo<Task>) => {
        const { item, index } = info;
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.navigate('Edit', { id: item.id });
            }}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemTime}>{`${item.startTime} 开始至 ${item.endTime} 结束`}</Text>
                    {
                        item.desc && <Text style={styles.itemDesc}>{item.desc}</Text>
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }

    public render() {
        return (
            <FlatList
                data={this.props.tasks}
                renderItem={this._renderItem.bind(this)}
                keyExtractor={(item) => `${item.id}`}
            />
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 100,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    itemTitle: {
        color: '#000',
        fontSize: 24,
    },
    itemTime: {
        color: '#333',
        fontSize: 18,
        marginTop: 10,
    },
    itemDesc: {
        color: '#333',
        fontSize: 18,
        marginTop: 10,
    }
});

export default connect((state: State) => ({
    tasks: state.tasks
}), dispatch => ({
    addTask: (name: string, startTime: number, endTime: number) => dispatch(addTaskAction(name, startTime, endTime))
}))
    (TodosScreen);