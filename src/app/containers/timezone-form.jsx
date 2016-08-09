import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
var moment = require('moment-timezone');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            dataSource: moment.tz.names(),
            selectedZone: undefined,
            dialogOpened: false
        };
    },
    handleTimezoneChange: function (e) {
        var selectedTimezone = _.find(this.state.availableTimezones, function (t) {
            return t.id == e.target.value;
        });
        this.setState({selectedZone: selectedTimezone});
    },
    handleSubmit: function () {
        this.setState({dialogOpened: false});
        this.props.onTimezoneAdded(this.state.selectedZone);
    },
    handleDialogOpening: function () {
        this.setState({
            dialogOpened: true,
            selectedZone: undefined
        });
    },
    handleDialogClosing: function () {
        this.setState({dialogOpened: false});
    },
    handleZoneChosen: function (choice) {
        var zone = moment.tz.zone(choice);
        this.setState({
            selectedZone: {
                name: zone.name.split('/')[1].replace('_', ' '),
                offset: zone.offset(Date.now())
            }
        });
    },
    render: function () {
        var dialogActions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleDialogClosing}/>,
            <FlatButton
                label="OK"
                primary={true}
                onTouchTap={this.handleSubmit}/>
        ];

        var dialogStyle = {
            width: '450px',
            margin: 'auto auto'
        };

        return (
            <div>
                <FlatButton label="Add timezone"
                            primary={true}
                            onTouchTap={this.handleDialogOpening}/>
                <Dialog
                    title="Choose timezone"
                    open={this.state.dialogOpened}
                    modal={false}
                    actions={dialogActions}
                    contentStyle={dialogStyle}>

                    <AutoComplete
                        hintText="Type your timezone..."
                        dataSource={this.state.dataSource}
                        onNewRequest={this.handleZoneChosen}
                        filter={AutoComplete.caseInsensitiveFilter}
                        fullWidth={true}
                    />
                </Dialog>
            </div>
        );
    }
});