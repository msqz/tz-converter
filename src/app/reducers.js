import {combineReducers} from 'redux';
import {ADD_TIMEZONE, TICK, SET_TIME, RUN_CLOCK, HALT_CLOCK} from './actions';
import _ from 'underscore';


export const initialState = {
    timezones: [],
    clock: {
        now: new Date(),
        isTicking: true
    }
};

function timezones(state = [], action) {
    switch (action.type) {
        case ADD_TIMEZONE:
            return [
                ...state,
                {
                    id: state.length + 1,
                    name: action.name,
                    offset: action.offset
                }
            ];
        default:
            return state;
    }
}

function clock(state = {}, action) {
    switch (action.type) {
        case SET_TIME:
            if (isNaN(action.time.getTime()))
                return state;
            return _.assign({}, state, {now: action.time});
        case TICK:
            let now = new Date(state.now);
            now.setSeconds(now.getSeconds() + 1);
            return _.assign({}, state, {now: now});
        case RUN_CLOCK:
            return _.assign({}, state, {isTicking: true});
        case HALT_CLOCK:
            return _.assign({}, state, {isTicking: false});
        default:
            return state;
    }
}

export const timezoneConverterApp = combineReducers({
    timezones,
    clock
});