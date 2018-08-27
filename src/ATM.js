import {Component} from 'react';
import React from 'react';
import {Button} from './widgets/Button';
import {Amount} from './widgets/Amount';
import {Status} from './widgets/saveStatus';
import {AlertBox} from './widgets/AlertBox';
import util from 'util';

export class ATM extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentAccount: this.props.currentAccount,
            transactionType: 's',
            transactionStatus: undefined };

        this.handleDepositEvent = this.handleDepositEvent.bind(this);
        this.handleWithdrawalEvent = this.handleWithdrawalEvent.bind(this);
        this.handleBalanceQueryEvent = this.handleBalanceQueryEvent.bind(this);
        this.handleLogoutEvent = this.handleLogoutEvent.bind(this);
        this.handleButtonClickEvent = this.handleButtonClickEvent.bind(this);
    }

    resetTransactionType() {
        this.setState({transactionType: 's'})
    }

    setTransactionState(result) {
        this.setState({transactionStatus: result});
    }

    saveState(prevState, amount, isWithdrawal) {
        {
            const bal = isWithdrawal ? prevState.currentAccount.balance - amount : prevState.currentAccount.balance + amount;
            const tod = isWithdrawal ? prevState.today + amount : prevState.today;
            let acct = ({
                currentAccount: {
                    balance: bal,
                    today: tod,
                    limit: (prevState.currentAccount.limit)
                }
            });
            this.props.handleTransaction(acct.currentAccount);
            return acct;
        }
    }

    handleDepositEvent(amount) {
        console.log(`handle deposit event called with amount: ${amount}`);

        this.setState((prevState) => this.saveState(prevState, amount, false));
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

        this.setState((prevState) => this.saveState(prevState, amount, true));
        this.resetTransactionType();
        this.setTransactionState(Status.SUCCESS);
    }

    handleBalanceQueryEvent(event) {
        event.preventDefault();
        console.log(`handle balance query event called`);

        this.resetTransactionType();
        this.resetTransactionState(Status.IDLE);
    }
    
    handleLogoutEvent(event) {
        event.preventDefault();
        console.log(`ATM handleLogoutEvent called`);
        this.props.propagateLogout();
    }

    handleButtonClickEvent(event) {
        event.preventDefault();
        console.log(`handle button click event called: ${event.target.value}`);
        this.setState({transactionType: event.target.value});
    }
    
    render() {
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
            <div className="flex flex-column">
                {buttonForm}
                {buttonElement}
            </div>
        );
    }
}