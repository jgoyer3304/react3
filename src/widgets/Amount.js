import {Component} from 'react';
import React from 'react';
import util from 'util';
import {Button} from './Button';
import {Styles} from '../styles/styles';

export class Amount extends React.Component {

    constructor(props) {
        super(props);
        this.handleUpdateEvent = this.handleUpdateEvent.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.state = {amt: ''};
        console.log( `state: ${util.inspect(this.state,{depth:2})}`);
    }

    handleUpdateEvent(event) {
        console.log(`handleUpdateEvent called with value: ${event.target.value}`);

        event.preventDefault();
        const val = this.state.amt;
        this.setState({amt: ''});

        if (val.match(/\d{0,4}\.\d{2}/)) {
            this.props.updateHandler(Number(val));
        } else {
            console.log(`Bad input ${val}, resetting to empty`);
        }
    }

    handleChangeEvent(event) {
        console.log(`handleChangeEvent called with value: ${event.target.value}`);
        const val = `${event.target.value}`;
        console.log(`handleChangeEvent called with state: ${util.inspect(this.state,{depth:2})}`);
        
        this.setState(() => ({amt: val}));
    }

    render() {
        return (
            <div>
                <label htmlFor="amtEntry">
                   Enter amount {this.props.direction} (xxxx.xx):
                </label>
                <input type="text" maxLength="7" onChange={this.handleChangeEvent}
                       value={this.state.amt} id="amtEntry">
                </input> 
                <Button label="submit" onClick={this.handleUpdateEvent} value={this.state.amt}/>
            </div>
           
       );
   }
}