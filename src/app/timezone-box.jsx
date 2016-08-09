var React = require('react');
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

module.exports = React.createClass({
    render: function () {
        var time = new Date(this.props.time);
        if (this.props.offset)
            time.setMinutes(time.getMinutes() - this.props.offset);

        var style = {
            height: 120,
            width: 190,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        };
        return (
            <Card style={style}>
                <div className="timezone-box">
                    <CardTitle title={this.props.label}/>
                    <CardText>
                        {time.toLocaleTimeString()}
                    </CardText>
                </div>
            </Card>
        );
    }
});