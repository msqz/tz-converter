var React = require('react');
var TimezoneBox = require('./timezone-box.jsx');
var TimezoneList = require('./timezone-list.jsx');
var TimezoneForm = require('./timezone-form.jsx');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            now: new Date(),
            timezones: [],
            localOffset: (new Date()).getTimezoneOffset(),
            newTimezone: {},
            clock: {},
            ticking: false
        };
    },
    componentWillMount: function () {
        this.tick();
        this.setState({
            ticking: true
        })
    },
    componentDidMount: function () {
        this.runClock();
    },
    tick: function () {
        var now = this.state.now;
        now.setSeconds(now.getSeconds() + 1);

        this.setState({
            now: now,
            ticking: true
        });
    },
    handleTimezoneAdded: function (timezone) {
        var timezones = [].concat(this.state.timezones);
        timezones.push(timezone);
        this.setState({
            timezones: timezones
        });
    },
    toggleTick: function () {
        if (this.state.ticking)
            this.haltClock();
        else
            this.runClock();
    },
    runClock: function () {
        this.setState({
            clock: setInterval(this.tick, 1000)
        })
    },
    haltClock: function () {
        clearInterval(this.state.clock);
        this.setState({
            ticking: false
        });
    },
    handleOnTimeChanged: function (tickFrom) {
        this.setState({
            now: tickFrom
        });
        this.runClock();
    },
    reset: function () {
        this.setState({
            now: new Date()
        });
    },
    render: function () {
        return (
            <MuiThemeProvider>
                <div className="converter-container">
                    <Card>
                        <CardTitle title="Timezone converter"/>
                        <CardText>
                            <TimezoneBox label={"Local time"} time={this.state.now} offset={this.state.localOffset}/>
                            <TimezoneBox label={"GMT time"} time={this.state.now}/>
                        </CardText>
                        <CardActions>
                            <FlatButton label="Reset to real time" onClick={this.reset} secondary={true}/>
                        </CardActions>
                    </Card>
                    <br/>
                    <Card>
                        <CardTitle title="Your timezones"/>
                        <CardText>
                            <TimezoneList data={this.state.timezones} utc={this.state.now}
                                          onTimeChangingStarted={this.haltClock}
                                          onTimeChangingFinished={this.handleOnTimeChanged}/>
                        </CardText>
                        <CardActions>
                            <TimezoneForm onTimezoneAdded={this.handleTimezoneAdded}/>
                        </CardActions>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
});