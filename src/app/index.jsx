import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {timezoneConverterApp, initialState} from './reducers';
import TimezoneConverter from './containers/timezone-converter';
import {runClock, tick} from './actions';

let store = createStore(timezoneConverterApp, initialState);
render(
    <Provider store={store}>
        <TimezoneConverter />
    </Provider>,
    document.getElementById('app')
);

let timerInterval = null;
watchOnClockState();

function watchOnClockState() {
    store.subscribe(() => {
        if (store.getState().clock.isTicking && timerInterval === null) {
            timerInterval = setInterval(() => store.dispatch(tick()), 1000);
        }
        if (!store.getState().clock.isTicking && timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    });
    store.dispatch(runClock());
}
