var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./timezone-converter.jsx');
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
ReactDOM.render(<App />, document.getElementById('app'));