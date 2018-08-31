import {Component} from 'react';
import React from 'react';
import util from 'util';
import {Button} from './widgets/Button';
import {Styles} from './styles/styles';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoginEvent = this.handleLoginEvent.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.state = {pin: ''};
        console.log( `state: ${util.inspect(this.state,{depth:2})}`);
    }

    handleLoginEvent(event) {
        //console.log(`handleLoginEvent called with value: ${event.target.value}`);
        event.preventDefault();
        if (!this.props.validPins.includes(event.target.value)) {
            console.log(`Login failed!!!`);
            this.setState({pin:''});
        } else {
            this.props.loginHandler(event.target.value);
        }
    }

    handleChangeEvent(event) {
        //console.log(`handleChangeEvent called with value: ${event.target.value}`);
        const val = `${event.target.value}`;
        this.setState(() => ({pin: val}));
    }
    
    render() {
        console.log( `state2: ${util.inspect(this.state,{depth:2})}`);
        return (
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

       );
   }
}