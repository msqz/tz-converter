import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
var timeNormalizer = require('../time-normalizer');
import moment from 'moment';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            isChanging: false,
            customTime: timeNormalizer.toOffsetedTimestring(this.props.time, this.props.offset)
        }
    },
    handleOnFocus: function (e) {
        this.setState({isChanging: true});
        this.props.onTimeChangingStarted();
    },
    handleOnBlur: function (e) {
        this.setState({isChanging: false});
        var year = this.props.time.getFullYear();
        var month = this.pad(this.props.time.getMonth());
        var day = this.pad(this.props.time.getDate());
        var newTime = new Date(`${year}-${month}-${day}T${this.state.customTime}${this.tokenizeOffset()}`);
        this.props.onTimeChangingFinished(newTime);
    },
    handleOnChange: function (e) {
        this.setState({customTime: e.target.value});
    },
    render: function () {
        var time = timeNormalizer.toOffsetedTimestring(this.props.time, this.props.offset);
        if (this.state.isChanging) {
            time = this.state.customTime;
        }

        return (
            <Paper className="user-timezone">
                <span>{this.props.name } (GMT { this.tokenizeOffset() })</span>
                <TextField name={this.props.name}
                           className="user-timezone-input white-text"
                           type="time"
                           value={time}
                           onChange={this.handleOnChange}
                           onFocus={this.handleOnFocus}
                           onBlur={this.handleOnBlur}/>
            </Paper>
        );
    },
    tokenizeOffset: function () {
        var offsetHolder = new Date(0);
        offsetHolder.setHours(0);
        offsetHolder.setMinutes(Math.abs(this.props.offset));
        var tokenized =
            ('0' + (offsetHolder.getHours())).slice(-2) +
            ':' +
            ('0' + offsetHolder.getMinutes()).slice(-2);
        if (this.props.offset > 0)
            tokenized = '-' + tokenized;
        else
            tokenized = '+' + tokenized;

        return tokenized;
    },
    pad: function (num) {
        return ("0" + num).slice(-2);
    }
});