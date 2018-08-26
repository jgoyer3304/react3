import {Component} from 'react';
import React from 'react';
import util from 'util';

export class Disp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <textarea value={this.props.text.pin} id="display" readOnly/>;
    }

}