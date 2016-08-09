var React = require('react');
var TimezoneListItem = require('./timezone-list-item.jsx');

module.exports = React.createClass({
    render: function () {
        var utc = this.props.utc;
        var timeChangingStartedHandler = this.props.onTimeChangingStarted;
        var timeChangingFinishedHandler = this.props.onTimeChangingFinished;

        var timezoneNodes = this.props.data.map(function (timezone) {
            return (
                <TimezoneListItem key={timezone.id} name={timezone.name} offset={timezone.offset}
                                  utc={utc} onTimeChangingStarted={timeChangingStartedHandler}
                                  onTimeChangingFinished={timeChangingFinishedHandler}/>
            );
        });

        return (
            <div className="timezones-list">
                {timezoneNodes}
            </div>
        );
    }
});