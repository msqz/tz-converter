export const ADD_TIMEZONE = 'ADD_TIMEZONE';
export const SET_TIME = 'SET_TIME';
export const RUN_CLOCK = 'RUN_CLOCK';
export const HALT_CLOCK = 'HALT_CLOCK';
export const TICK = 'TICK';

export function addTimezone(name, offset) {
    return {type: ADD_TIMEZONE, name, offset}
}

export function setTime(time) {
    return {type: SET_TIME, time}
}

export function runClock() {
    return {type: RUN_CLOCK}
}

export function haltClock() {
    return {type: HALT_CLOCK}
}

export function tick() {
    return {type: TICK}
}