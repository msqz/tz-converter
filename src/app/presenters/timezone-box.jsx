import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
var timeNormalizer = require('./../time-normalizer');

const TimezoneBox = ({label, time, offset}) => (
    <Card className="timezone-box">
        <CardTitle title={label}/>
        <CardText>
            <span>{timeNormalizer.toOffsetedTimestring(time, offset || 0)}</span>
        </CardText>
    </Card>
);

TimezoneBox.propTypes = {
    label: React.PropTypes.string.isRequired,
    time: React.PropTypes.object.isRequired
};

export default TimezoneBox;