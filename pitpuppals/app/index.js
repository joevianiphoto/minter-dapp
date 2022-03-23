import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import "semantic-ui-css/semantic.min.css";
import React from 'react';
import ReactDOM from 'react-dom';  
import App from './components/App'
import $ from 'jquery'
 

export function Load_PitPuppyPals_App(div) {   
    ReactDOM.render(<App name={'ppp'} api_url="http://www.pitpuppypals.com/" />, document.getElementById(div)); 
}
 