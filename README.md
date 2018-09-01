# react3

Simple ATM application in React. Demo for Spanning Cloud Apps LLC.

**Author**: John Goyer  
**No rights reserved**

### Prerequisites 

* npm 
* Nodejs 8.10

### Execution

1. npm run start
2. go to http://localhost:8080
3. Valid login PINs are `1111`, `2222` and `3333`.

### Execution Notes

The bank has three accounts, with initial state as shown here:

        this.acctMap = {
            '1111' : {balance: 400.00, limit: 200.00, today: 0.00},
            '2222' : {balance: 200.00, limit: 100.00, today: 0.00},
            '3333' : {balance: 300.00, limit: 50.00, today: 0.00}

The app has two screens, a login screen and an ATM screen.  The user
gestures are self-explanatory (I hope).

### Implementation

This app is a React app. I used this exercise as an excuse to learn React
and a little bit about styling React components.  React itself is logical.
CSS is a nightmare, so the styling is pretty primitive.

