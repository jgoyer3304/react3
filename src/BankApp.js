import {Component} from 'react';
import React from 'react';
import {Login} from './Login';
import {Disp} from './Disp';
import util from 'util';
import {Button} from './Button';
import {Amount} from './Amount';
import {Status} from './saveStatus';
import {AlertBox} from './AlertBox';

// Based on pin we select an account
export class BankApp extends React.Component {
    constructor(props) {
        super(props);
        console.log(`Bank app ctor called`);
        this.acctMap = {
            '1111' : {balance: 400.00, limit: 200.00, today: 0.00},
            '2222' : {balance: 200.00, limit: 100.00, today: 0.00},
            '3333' : {balance: 300.00, limit: 50.00, today: 0.00}
        };

        this.state = { pin: '',
            currentAccount: undefined,
            transactionType: 's',
            transactionStatus: undefined };

        this.handleLoginEvent = this.handleLoginEvent.bind(this);
        this.handleLogoutEvent = this.handleLogoutEvent.bind(this);
        this.handleDepositEvent = this.handleDepositEvent.bind(this);
        this.handleWithdrawalEvent = this.handleWithdrawalEvent.bind(this);
        this.handleBalanceQueryEvent = this.handleBalanceQueryEvent.bind(this);
        this.handleButtonClickEvent = this.handleButtonClickEvent.bind(this);
    };

    resetTransactionType() {
        this.setState({transactionType: 's'})
    }

    setTransactionState(result) {
        this.setState({transactionStatus: result});
    }

    // if this routine is called we are logged in
    handleLoginEvent(pin) {
        console.log(`handle login event called`);
        this.setState({ pin: pin, currentAccount: this.acctMap[pin] });
    };
    
    handleLogoutEvent(event) {
        console.log(`handle logout event called`);
        event.preventDefault();
        this.acctMap[this.state.pin] = this.state.currentAccount;
        this.setState({pin: '', currentAccount: undefined, transactionType: ''});
    }

    handleDepositEvent(amount) {
        console.log(`handle deposit event called with amount: ${amount}`);

        this.setState((prevState) =>
            ({ currentAccount:
                { balance: (prevState.currentAccount.balance + amount)}}));

        this.resetTransactionType();
        this.setTransactionState(Status.SUCCESS);
    }

    handleWithdrawalEvent(amount) {

        console.log(`handle withdrawal event called with amount: ${amount}`);
        if (this.state.currentAccount.today + amount > this.state.currentAccount.limit) {
            this.resetTransactionType();
            this.setTransactionState(Status.FAILURE);
            return;
        }

        this.setState((prevState) =>
            ({currentAccount:
                {balance: (prevState.currentAccount.balance - amount),
                    today: (prevState.currentAccount.today + amount),
                    limit: (prevState.currentAccount.limit)}
            }));

        this.resetTransactionType();
        this.setTransactionState(Status.SUCCESS);
    }
    
    handleBalanceQueryEvent(event) {
        event.preventDefault();
        console.log(`handle balance query event called`);

        this.resetTransactionType();
        this.resetTransactionState(Status.IDLE);
    }

    handleButtonClickEvent(event) {
        event.preventDefault();
        console.log(`handle button click event called: ${event.target.value}`);
        this.setState({transactionType: event.target.value});
    }

    render() {

        if (this.state.currentAccount === undefined) {
            return (
                <div className="flex flex-column mw-4 ba pa6 sans-serif bg-light-gray">
                    <form>
                        <Login pin={this.state} loginHandler={this.handleLoginEvent} 
                               validPins={Object.keys(this.acctMap)}/>
                    </form>
                </div>
            );
        } else {
            const navButtons = (
                <form className="flex flex-column pa4 sans-serif">
                    <div className="w-25 pa1 ml2">
                        <Button label="logout" onClick={this.handleLogoutEvent} value=''/>
                    </div>
                    <div className="w-25 pa1 ml2">
                        <Button label="deposit" onClick={this.handleButtonClickEvent} value='d'/>
                    </div>
                    <div className="w-25 pa1 ml2">
                        <Button label="withdraw" onClick={this.handleButtonClickEvent} value='w'/>
                    </div>
                    <div className="w-25 pa1 ml2">
                        <Button label="balance" onClick={this.handleButtonClickEvent} value='q'/>
                    </div>
                </form>);

            const depositButton = (
                <form className="flex flex-column pa4 sans-serif">
                    <Amount updateHandler={this.handleDepositEvent}/>
                </form>
            );

            const withdrawalButton = (
                <form className="flex flex-column pa4 sans-serif">
                    <Amount updateHandler={this.handleWithdrawalEvent}/>
                </form>
            );

            let buttonForm = navButtons;
            let buttonElement = null;

            if (this.state.transactionType === 'd') {
                buttonForm = navButtons;
                buttonElement = depositButton;
            } else if (this.state.transactionType == 'w') {
                buttonForm = navButtons;
                buttonElement = withdrawalButton;
            } else if (this.state.transactionType == 'q') {
                const msg = `Balance: ${Number(this.state.currentAccount.balance).toFixed(2)}`;
                buttonElement = <input className="flex flex-column pa4 sans-serif" readOnly value={msg}/>;
            } else if (this.state.transactionType == 's' && this.state.transactionStatus != undefined) {
                buttonElement = <AlertBox status={this.state.transactionStatus}/>;
            }

            return (
                <div className="flex items-center mw-4 ba sans-serif bg-light-gray">
                    {buttonForm}
                    {buttonElement}
                </div>

            );
        }

    };
    

}