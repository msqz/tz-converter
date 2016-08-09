var React = require('react');
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            dataSource: [{
                id: 1, name: 'Warsaw', offset: -120
            }, {
                id: 2, name: 'Moscow', offset: -240
            }, {
                id: 3, name: 'London', offset: 0
            }],
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
        this.setState({selectedZone: choice});
    },
    render: function () {
        var dialogActions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleDialogClosing}
            />,
            <FlatButton
                label="OK"
                primary={true}
                onTouchTap={this.handleSubmit}
            />
        ];

        var dataSourceConfig = {
            text: 'name',
            value: 'id'
        };

        var dialogStyle = {
            width: '450px',
            margin: 'auto auto'
        };

        return (
            <div>
                <FlatButton label="Add timezone" primary={true} onTouchTap={this.handleDialogOpening}/>
                <Dialog
                    title="Choose timezone"
                    open={this.state.dialogOpened}
                    modal={false}
                    actions={dialogActions}
                    contentStyle={dialogStyle}>

                    <AutoComplete
                        hintText="Your zone"
                        dataSource={this.state.dataSource}
                        onNewRequest={this.handleZoneChosen}
                        dataSourceConfig={dataSourceConfig}
                        filter={AutoComplete.caseInsensitiveFilter}
                        fullWidth={true}
                    />
                </Dialog>
            </div>
        );
    }
});