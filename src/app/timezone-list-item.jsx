var React = require('react');
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            isDuringModification: false,
            customTime: this.props.utc
        }
    },
    handleOnFocus: function (e) {
        this.setState({
            isDuringModification: true
        });
        this.props.onTimeChangingStarted();
    },
    handleOnBlur: function (e) {
        this.setState({
            isDuringModification: false
        });
        this.props.onTimeChangingFinished(this.state.customTime);
    },
    handleOnChange: function (e) {
        var hhMMss = e.target.value.split(':');
        var customTime = new Date(this.props.utc);
        customTime.setHours(hhMMss[0] || 0);
        customTime.setMinutes(hhMMss[1] || 0);

        this.setState({
            customTime: customTime
        });
    },
    render: function () {
        var localTime = new Date(this.props.utc);
        if (this.state.isDuringModification)
            localTime = new Date(this.state.customTime);
        else
            localTime.setHours(localTime.getHours() + this.props.offset);

        var offsetHolder = new Date(0);
        offsetHolder.setHours(0);
        offsetHolder.setMinutes(Math.abs(this.props.offset));
        var offset = ('0' + (offsetHolder.getHours())).slice(-2) + ':' + ('0' + offsetHolder.getMinutes()).slice(-2);
        if (this.props.offset > 0)
            offset = '+' + offset;
        else if (this.props.offset < 0)
            offset = '-' + offset;

        var itemStyle = {
            backgroundColor: '#673AB7',
            color: 'white',
            width: '190px',
            margin: '20px',
            padding: '15px 15px 5px 15px',
            display: 'inline-block',
            textAlign: 'center'
        };
        var inputStyle = {
            width: '100px',
            color: 'white !important'
        };

        return (
            <Paper style={itemStyle}>
                {this.props.name } (GMT { offset })
                <TextField type="time"
                           value={localTime.toLocaleTimeString()}
                           onChange={this.handleOnChange}
                           onFocus={this.handleOnFocus}
                           onBlur={this.handleOnBlur}
                           style={inputStyle}
                           className="white-text"/>
            </Paper>
        );

    }
});