import {Component} from 'react';
import React from 'react';
import {Login} from './Login';
import {ATM} from './ATM';
import util from 'util';

// Based on pin we select an account
export class Bank extends React.Component {
    constructor(props) {
        super(props);
        console.log(`Bank app ctor called`);
        
        this.acctMap = {
            '1111' : {balance: 400.00, limit: 200.00, today: 0.00},
            '2222' : {balance: 200.00, limit: 100.00, today: 0.00},
            '3333' : {balance: 300.00, limit: 50.00, today: 0.00}
        };

        this.state = { pin: undefined };

        this.handleLoginEvent = this.handleLoginEvent.bind(this);
        this.handleLogoutEvent = this.handleLogoutEvent.bind(this);
        this.commitTransaction = this.commitTransaction.bind(this);
    };
    

    // if this routine is called we are logged in
    handleLoginEvent(pin) {
        console.log(`handle login event called`);
        this.setState({pin: pin});
    };
    
    handleLogoutEvent() {
        console.log(`handle logout event called`);
        this.setState({pin: undefined});
    }
    
    commitTransaction(account) {
        console.log(`commitTransaction called with account: ${util.inspect(account,{depth:4})}`);
        this.acctMap[this.state.pin] = account;
    }

    // Should establish basic look and feel of bank app. If not logged in, render login
    // screen. Otherwise render ATM.
    render() {
        if (this.state.pin === undefined) {
            return (
                <div className="flex flex-column mw-4 ba pa6 sans-serif bg-light-gray">
                    <form>
                        <Login pin={this.state} loginHandler={this.handleLoginEvent}
                               validPins={Object.keys(this.acctMap)}/>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="flex flex-column mw-4 ba pa6 sans-serif bg-light-gray">
                    <ATM currentAccount={this.acctMap[this.state.pin]} handleTransaction={this.commitTransaction}
                        propagateLogout={this.handleLogoutEvent}/>
                </div>
            );
        }
    }
    

}