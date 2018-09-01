import {Component} from 'react';
import React from 'react';
import util from 'util';
import {Button} from './widgets/Button';
import {Styles} from './styles/styles';
import {Status} from './widgets/Status';
import {AlertBox} from './widgets/AlertBox';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoginEvent = this.handleLoginEvent.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.state = {pin: '', loginStatus: ''};
        console.log( `state: ${util.inspect(this.state,{depth:2})}`);
    }

    handleLoginEvent(event) {
        //console.log(`handleLoginEvent called with value: ${event.target.value}`);
        event.preventDefault();
        if (!this.props.validPins.includes(event.target.value)) {
            console.log(`Login failed!!!`);
            this.setState({pin:'', loginStatus: Status.LOGIN_FAILED});
        } else {
            this.props.loginHandler(event.target.value);
        }
    }

    handleChangeEvent(event) {
        //console.log(`handleChangeEvent called with value: ${event.target.value}`);
        const val = `${event.target.value}`;
        this.setState(() => ({pin: val, loginStatus: ''}));
    }
    
    render() {
        console.log( `state2: ${util.inspect(this.state,{depth:2})}`);

        let statusMsg = this.state.loginStatus == undefined ? null : <AlertBox status={this.state.loginStatus}/>;
        
        return (
            <div>
                <div style={Styles.InnerScreen}>
                    {statusMsg}
                </div>
                <div style={Styles.BottomMenu}>
                    <div style={Styles.MenuItem}>
                        <label>Please Sign In:</label>
                    </div>
                    <div style={Styles.MenuItem}>
                        <input type="text" placeholder="XXXX" maxLength="4" onChange={this.handleChangeEvent}
                                   value={this.state.pin} id="pinEntry">
                        </input>
                        <Button onClick={this.handleLoginEvent} value={this.state.pin} label="Login"></Button>
                    </div>
                </div>
            </div>
       );
   }
}