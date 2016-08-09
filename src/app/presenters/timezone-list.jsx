import React from 'react';
var TimezoneListItem = require('../containers/timezone-list-item.jsx');

const TimezoneList = ({
    time,
    timezones,
    onTimeChangingStarted,
    onTimeChangingFinished
})=> (
    <div>
        {timezones.map(timezone=>
            <TimezoneListItem key={timezone.id}
                              name={timezone.name}
                              offset={timezone.offset}
                              time={time}
                              onTimeChangingStarted={onTimeChangingStarted}
                              onTimeChangingFinished={onTimeChangingFinished}
            />
        )}
    </div>
);

export default TimezoneList;