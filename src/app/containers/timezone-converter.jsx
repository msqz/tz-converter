import React from 'react';
import {connect} from 'react-redux';
import {addTimezone, setTime, runClock, haltClock, tick} from '../actions';
import TimezoneConverterLayout from '../presenters/timezone-converter-layout'

const mapStateToProps = (state) => {
    return {
        time: state.clock.now,
        timezones: state.timezones
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTimezoneAdded: (zone) => {
            dispatch(addTimezone(zone.name, zone.offset));
        },
        onTimeChangingStarted: () => {
            dispatch(haltClock());
        },
        onTimeChangingFinished: (time) => {
            dispatch(setTime(time));
            dispatch(runClock());
        },
        onResetRequested: () => {
            dispatch(setTime(new Date()))
        }
    }
};

const TimezoneConverter = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimezoneConverterLayout);

export default TimezoneConverter;