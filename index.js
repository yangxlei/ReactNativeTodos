/** @format */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers';
import { initTasks } from './src/reducers/action';

import { RoutersConfig } from './App';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(RoutersConfig.routes, RoutersConfig.initial);

const store = createStore(reducer/*, applyMiddleware()*/);

const AppContaienr = createAppContainer(AppNavigator);

function Application() {
    return (
        <Provider store={store}>
            <AppContaienr />
        </Provider>
    );
}

store.dispatch(initTasks());

AppRegistry.registerComponent(appName, () => Application);
