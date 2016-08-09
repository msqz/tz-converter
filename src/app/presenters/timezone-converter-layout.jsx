import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import TimezoneBox from '../presenters/timezone-box';
import TimezoneList from '../presenters/timezone-list';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snackbar from 'material-ui/Snackbar';
var TimezoneForm = require('../containers/timezone-form.jsx');

//material-ui required workaround
injectTapEventPlugin();

const TIME_GAP_TRESHOLD_SECONDS = 3;

const isTimeGapUnrealistic = function (time) {
    return (
        Math.abs(time.getTime() - (new Date()).getTime()) / 1000 > TIME_GAP_TRESHOLD_SECONDS
    )
};

const TimezoneConverterLayout = ({
    time,
    timezones,
    onResetRequested,
    onTimeChangingStarted,
    onTimeChangingFinished,
    onTimezoneAdded
}) => (
    <MuiThemeProvider>
        <div className="converter-container">
            <Card>
                <CardTitle title="Timezone converter"/>
                <CardText>
                    <TimezoneBox label={"Local time"}
                                 time={time}
                                 offset={(new Date()).getTimezoneOffset()}/>
                    <TimezoneBox label={"GMT time"}
                                 time={time}/>
                </CardText>
                <CardActions>
                    <FlatButton label="Reset to real time"
                                onClick={onResetRequested}
                                secondary={true}/>
                    <Snackbar
                        open={isTimeGapUnrealistic(time)}
                        message="Time is out of sync with reality"
                    />
                </CardActions>
            </Card>
            <br/>
            <Card>
                <CardTitle title="Your timezones"/>
                <CardText>
                    <TimezoneList timezones={timezones}
                                  time={time}
                                  onTimeChangingStarted={onTimeChangingStarted}
                                  onTimeChangingFinished={onTimeChangingFinished}/>
                </CardText>
                <CardActions>
                    <TimezoneForm onTimezoneAdded={onTimezoneAdded}/>
                </CardActions>
            </Card>
        </div>
    </MuiThemeProvider>
);

export default TimezoneConverterLayout

